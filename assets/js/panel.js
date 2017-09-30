const {ipcRenderer} = require('electron');

const openAnswer1   = document.getElementById('open-answer-1');
const onMistakeOne1 = document.getElementById('on-mistake-one-1');
const nextRound     = document.getElementById('next-round');

openAnswer1.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'open-answer-1');
});

onMistakeOne1.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'on-mistake-one-1');
});

nextRound.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'next-round');
});