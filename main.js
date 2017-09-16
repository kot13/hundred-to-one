const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {ipcMain} = require('electron');

const path = require('path');
const url = require('url');

let tablo, panel;

function createWindow () {
  tablo = new BrowserWindow({width: 1280, height: 768});
  tablo.loadURL(url.format({
    pathname: path.join(__dirname, 'layouts/tablo.html'),
    protocol: 'file:',
    slashes: true
  }));
  // tablo.webContents.openDevTools();
  tablo.on('closed', function () {
    tablo = null
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
  if (tablo === null || panel === null) {
    createWindow()
  }
});

ipcMain.on('asynchronous-message', (event, arg) => {
  tablo.send('asynchronous-reply', 'pong');
});
