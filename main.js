const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
let store = require('./assets/js/store');

let board, panel;

function createWindow () {
  board = new BrowserWindow({
    width: 1280,
    height: 768,
    resizable: false
  });
  board.loadURL(url.format({
    pathname: path.join(__dirname, 'layouts/board.html'),
    protocol: 'file:',
    slashes: true
  }));
  board.webContents.openDevTools();
  board.on('closed', function () {
    board = null;
  });

  panel = new BrowserWindow({
    width: 900,
    height: 600
  });
  panel.loadURL(url.format({
    pathname: path.join(__dirname, 'layouts/panel.html'),
    protocol: 'file:',
    slashes: true
  }));
  panel.webContents.openDevTools();
  panel.on('closed', function () {
    panel = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (board === null || panel === null) {
    createWindow()
  }
});

ipcMain.on('asynchronous-message', (event, data) => {
  switch (data.cmd) {
    case 'open-team':
      if (!store.state.teams[data.team].visible) {
        store.state.teams[data.team].visible = true;
        board.send('asynchronous-reply', {
          event: 'open-team-' + data.team,
          state: store.state
        });
      }
      break;

    case 'open-answer':
      if (store.state.roundAnswers[data.index].visible) {
        break;
      }
      store.state.roundAnswers[data.index].visible = true;
      store.state.score.round += store.state.roundAnswers[data.index].cost;
      board.send('asynchronous-reply', {
        event: 'open-answer-' + data.index,
        state: store.state
      });
      break;

    case 'win':
      if (store.state.currentRound <= 3) {
        store.state.score[data.team] += store.state.score.round * store.state.currentRound;
      } else {
        store.state.score[data.team] += store.state.score.round;
      }
      store.state.score.round = 0;

      board.send('asynchronous-reply', {
        event: 'win-' + data.team,
        state: store.state
      });
      break;

    case 'on-mistake':
      board.send('asynchronous-reply', {
        event: 'on-mistake-' + data.team + '-' + data.index,
        state: store.state
      });
      break;

    case 'next-round':
      if (store.state.currentRound > 4) {
        break;
      }

      if (store.state.currentRound != 4) {
        store.state.roundAnswers = store.state.rounds[store.state.currentRound].answers;
      }
      store.state.currentRound++;

      board.send('asynchronous-reply', {
        event: 'next-round',
        state: store.state
      });
      break;

    case 'final-open-answer':
      if (store.state.final.answers[data.index].visible) {
        break;
      }

      store.state.final.answers[data.index].visible = true;
      let team = 'one';
      if (data.index <= 5) {
        store.state.final.score.one += Number(data.cost);
      } else {
        team = 'two';
        store.state.final.score.two += Number(data.cost);
      }
      store.state.score.round += Number(data.cost);

      board.send('asynchronous-reply', {
        event: 'final-open-answer',
        title: data.title,
        cost: data.cost,
        state: store.state,
        index: data.index,
        team: team
      });
      break;

    case 'close':
      board.send('asynchronous-reply', {
        event: 'close',
        team: data.team
      });
      break;

    case 'open':
      board.send('asynchronous-reply', {
        event: 'open',
        team: data.team
      });
      break;
  }
});
