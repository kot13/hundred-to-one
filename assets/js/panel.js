const BrowserWindow = require('electron').remote.BrowserWindow;
const {ipcRenderer} = require('electron');

const btn = document.getElementById('button');

btn.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'ping');
});