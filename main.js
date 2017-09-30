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

  panel = new BrowserWindow({width: 800, height: 600});
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

ipcMain.on('asynchronous-message', (event, arg) => {
  switch (arg) {
    case 'open-team-one':
      store.state.teams.one.visible = true;
    case 'open-team-two':
      store.state.teams.two.visible = true;
    case 'open-answer-1':
    case 'on-mistake-one-1':
      board.send('asynchronous-reply', {
        event: arg,
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
        event: arg,
        state: store.state
      });
      break;
  }
});
