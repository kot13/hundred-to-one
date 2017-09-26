const {ipcRenderer} = require('electron');
const Handlebars = require('handlebars');
let store = require('./store');

let App      = document.getElementById('app');
let source   = document.getElementById('board-template').innerHTML;
let template = Handlebars.compile(source);
let html     = template(store.state);

let audioOpenAnswer  = document.getElementById('audio-open-answer');
let audioWrongAnswer = document.getElementById('audio-wrong-answer');

App.innerHTML = html;

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    switch (arg) {
        case 'ping':
            let a1 = document.getElementById('answer-0');
            a1.className += ' hover';
            audioOpenAnswer.play();
            break;

        case 'ping2':
            let a2 = document.getElementById('mistake-one-1');
            a2.className += ' on';
            audioWrongAnswer.play();
            break;
    }

    // html          = template(state);
    // App.innerHTML = html;
});