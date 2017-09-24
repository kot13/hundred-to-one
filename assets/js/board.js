const {ipcRenderer} = require('electron');
const Handlebars = require('handlebars');
let store = require('./store');

let App      = document.getElementById('app');
let source   = document.getElementById('board-template').innerHTML;
let template = Handlebars.compile(source);
let html     = template(store.state);

App.innerHTML = html;

ipcRenderer.on('asynchronous-reply', (event, state) => {
    html          = template(state);
    App.innerHTML = html;
});