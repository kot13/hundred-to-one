const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

let board, panel;

function createWindow () {
  board = new BrowserWindow({width: 1280, height: 768});
  board.loadURL(url.format({
    pathname: path.join(__dirname, 'layouts/board.html'),
    protocol: 'file:',
    slashes: true
  }));
  // board.webContents.openDevTools();
  board.on('closed', function () {
    board = null;
  });

  panel = new BrowserWindow({width: 800, height: 600});
  panel.loadURL(url.format({
    pathname: path.join(__dirname, 'layouts/panel.html'),
    protocol: 'file:',
    slashes: true
  }));
  // panel.webContents.openDevTools();
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
  board.send('asynchronous-reply', 'pong');
});
