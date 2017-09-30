const {ipcRenderer} = require('electron');
const Handlebars = require('handlebars');
let store = require('./store');
store.state.roundAnswers = store.state.rounds[0].answers;

let App            = document.getElementById('app');
let sourceTemplate = document.getElementById('board-template').innerHTML;
let sourceRound    = document.getElementById('round-template').innerHTML;
let sourceFinal    = document.getElementById('final-template').innerHTML;

Handlebars.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerPartial('gameField', sourceRound);

let template = Handlebars.compile(sourceTemplate);
let html     = template(store.state);


let audioOpenAnswer  = document.getElementById('audio-open-answer');
let audioWrongAnswer = document.getElementById('audio-wrong-answer');

App.innerHTML = html;

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    switch (arg.event) {
        case 'open-team-one':
            let teamOne = document.getElementById('team-one');
            teamOne.className += ' visible';
            audioOpenAnswer.play();
            break;

        case 'open-team-two':
            let teamTwo = document.getElementById('team-two');
            teamTwo.className += ' visible';
            audioOpenAnswer.play();
            break;

        case 'open-answer-1':
            let a1 = document.getElementById('answer-0');
            a1.className += ' hover';
            audioOpenAnswer.play();
            break;

        case 'on-mistake-one-1':
            let a2 = document.getElementById('mistake-one-1');
            a2.className += ' on';
            audioWrongAnswer.play();
            break;

        case 'next-round':
            if (arg.state.currentRound != 5) {
                html = template(arg.state);
            } else {
                Handlebars.registerPartial('gameField', sourceFinal);
                template = Handlebars.compile(sourceTemplate);
                html     = template(arg.state)
            }
            App.innerHTML = html;
    }
});