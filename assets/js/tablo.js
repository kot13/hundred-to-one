const {ipcRenderer} = require('electron');

const view = document.getElementById('view');

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    view.innerHTML = 'None';
});