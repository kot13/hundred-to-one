const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');
const store = require('./assets/js/store');
const storage = require('electron-json-storage');

let board, panel;

storage.setDataPath(os.tmpdir());

function loadSettings() {
  storage.get('hundred-to-one', function(error, data) {
    if (error) {
      throw error;
    }

    if (Object.keys(data).length != 0) {
      var state = store.getState();
      state.rounds = data;
      state.roundAnswers = state.rounds[0].answers;

      store.setState(state);
    }
  });

  createWindow();
}

function createWindow () {
  board = new BrowserWindow({
    width: 1280,
    height: 768
    // resizable: false
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
    width: 1080,
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
  });
}

app.on('ready', loadSettings);

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
      var state = store.getState();
      if (!state.teams[data.team].visible) {
        state.teams[data.team].visible = true;
        store.setState(state);

        board.send('asynchronous-reply', {
          event: 'open-team',
          team: data.team,
          state: state
        });
      }
      break;

    case 'open-answer':
      var state = store.getState();
      if (state.roundAnswers[data.index].visible) {
        break;
      }
      if (state.currentRound != 4) {
        state.score.round += Number(state.roundAnswers[data.index].cost);
      } else {
        state.score.round = Number(state.roundAnswers[data.index].cost);
      }

      state.roundAnswers[data.index].visible = true;
      store.setState(state);

      board.send('asynchronous-reply', {
        event: 'open-answer',
        index: data.index,
        state: state
      });
      break;

    case 'push-answer':
      var state = store.getState();
      state.score[data.team] += state.score.round;
      state.score.round = 0;
      store.setState(state);

      board.send('asynchronous-reply', {
        event: 'push-answer',
        team: data.team,
        state: state
      });
      break;

    case 'win':
      var state = store.getState();
      state.score[data.team] += state.score.round * state.currentRound;
      state.score.round = 0;
      store.setState(state);

      board.send('asynchronous-reply', {
        event: 'win',
        team: data.team,
        state: state
      });
      break;

    case 'on-mistake':
      board.send('asynchronous-reply', {
        event: 'on-mistake',
        team: data.team,
        index: data.index
      });
      break;

    case 'next-round':
      var state = store.getState();
      if (state.currentRound > 4) {
        break;
      }

      if (state.currentRound != 4) {
        state.roundAnswers = state.rounds[state.currentRound].answers;
      }
      state.currentRound++;
      state.score.round = 0;
      store.setState(state);

      board.send('asynchronous-reply', {
        event: 'next-round',
        state: state
      });
      panel.send('asynchronous-reply', {
        event: 'next-round',
        state: state
      });
      break;

    case 'final-open-answer':
      var state = store.getState();
      if (state.final.answers[data.index].visible) {
        break;
      }

      state.final.answers[data.index].visible = true;
      let team = 'one';
      if (data.index <= 5) {
        state.final.score.one += Number(data.cost);
      } else {
        team = 'two';
        state.final.score.two += Number(data.cost);
      }
      state.score.round += Number(data.cost);
      store.setState(state);

      board.send('asynchronous-reply', {
        event: 'final-open-answer',
        title: data.title,
        cost: data.cost,
        state: state,
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
