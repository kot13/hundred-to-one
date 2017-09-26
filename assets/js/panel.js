const {ipcRenderer} = require('electron');

const btn = document.getElementById('button');
const btn2 = document.getElementById('button2');

btn.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'ping');
});

btn2.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'ping2');
});