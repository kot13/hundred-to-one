const {ipcRenderer} = require('electron');

const openTeamOne   = document.getElementById('open-team-one');
const openTeamTwo   = document.getElementById('open-team-two');
const openAnswer1   = document.getElementById('open-answer-1');
const onMistakeOne1 = document.getElementById('on-mistake-one-1');
const nextRound     = document.getElementById('next-round');

openTeamOne.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'open-team-one');
});

openTeamTwo.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'open-team-two');
});

openAnswer1.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'open-answer-1');
});

onMistakeOne1.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'on-mistake-one-1');
});

nextRound.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', 'next-round');
});