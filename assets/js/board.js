const {ipcRenderer} = require('electron');
const Handlebars = require('handlebars');
let store = require('./store');

const App            = document.getElementById('app');
const sourceTemplate = document.getElementById('board-template').innerHTML;
const sourceRound    = document.getElementById('round-template').innerHTML;
const sourceFinal    = document.getElementById('final-template').innerHTML;

Handlebars.registerHelper('for', function(from, to, increment, block) {
    let result = '';
    for (let i = from; i < to; i += increment) {
        result += block.fn(i);
    }
    return result;
});

Handlebars.registerPartial('gameField', sourceRound);

let template = Handlebars.compile(sourceTemplate);

App.innerHTML = template(store.state);

const audioOpenAnswer  = document.getElementById('audio-open-answer');
const audioWrongAnswer = document.getElementById('audio-wrong-answer');

ipcRenderer.on('asynchronous-reply', (event, data) => {
    switch (data.event) {
        case 'open-team-one':
            document.getElementById('team-one').className += ' visible';
            audioOpenAnswer.play();
            break;

        case 'open-team-two':
            document.getElementById('team-two').className += ' visible';
            audioOpenAnswer.play();
            break;

        case 'open-answer-0':
            document.getElementById('answer-0').className += ' hover';
            audioOpenAnswer.play();
            document.getElementById('round-score').innerText = data.state.score.round;
            break;

        case 'open-answer-1':
            document.getElementById('answer-1').className += ' hover';
            audioOpenAnswer.play();
            document.getElementById('round-score').innerText = data.state.score.round;
            break;

        case 'open-answer-2':
            document.getElementById('answer-2').className += ' hover';
            audioOpenAnswer.play();
            document.getElementById('round-score').innerText = data.state.score.round;
            break;

        case 'open-answer-3':
            document.getElementById('answer-3').className += ' hover';
            audioOpenAnswer.play();
            document.getElementById('round-score').innerText = data.state.score.round;
            break;

        case 'open-answer-4':
            document.getElementById('answer-4').className += ' hover';
            audioOpenAnswer.play();
            document.getElementById('round-score').innerText = data.state.score.round;
            break;

        case 'open-answer-5':
            document.getElementById('answer-5').className += ' hover';
            audioOpenAnswer.play();
            document.getElementById('round-score').innerText = data.state.score.round;
            break;

        case 'on-mistake-one-0':
            document.getElementById('mistake-one-0').className += ' on';
            audioWrongAnswer.play();
            break;

        case 'on-mistake-one-1':
            document.getElementById('mistake-one-1').className += ' on';
            audioWrongAnswer.play();
            break;

        case 'on-mistake-one-2':
            document.getElementById('mistake-one-2').className += ' on';
            audioWrongAnswer.play();
            break;

        case 'on-mistake-two-0':
            document.getElementById('mistake-two-0').className += ' on';
            audioWrongAnswer.play();
            break;

        case 'on-mistake-two-1':
            document.getElementById('mistake-two-1').className += ' on';
            audioWrongAnswer.play();
            break;

        case 'on-mistake-two-2':
            document.getElementById('mistake-two-2').className += ' on';
            audioWrongAnswer.play();
            break;

        case 'win-one':
            document.getElementById('score-one').innerText = data.state.score.one;
            document.getElementById('round-score').innerText = 0;
            break;
        case 'win-two':
            document.getElementById('score-two').innerText = data.state.score.two;
            document.getElementById('round-score').innerText = 0;
            break;

        case 'next-round':
            if (data.state.currentRound != 5) {
                html = template(data.state);
            } else {
                Handlebars.registerPartial('gameField', sourceFinal);
                template = Handlebars.compile(sourceTemplate);
                html     = template(data.state)
            }

            App.innerHTML = html;
            break;

        case 'final-open-answer':
            let title = data.title + '<span class="percent">' + data.cost + '</span>';

            document.getElementById('answer-title-' + data.index).innerHTML = title;
            document.getElementById('answer-' + data.index).className += ' hover';
            audioOpenAnswer.play();

            document.getElementById('summa-' + data.team).innerText = data.state.final.score[data.team];
            document.getElementById('round-score').innerText = data.state.score.round;
            break;

        case 'close':
            if (data.team == 'one') {
                document.getElementById('answer-0').classList.remove('hover');
                document.getElementById('answer-1').classList.remove('hover');
                document.getElementById('answer-2').classList.remove('hover');
                document.getElementById('answer-3').classList.remove('hover');
                document.getElementById('answer-4').classList.remove('hover');
                document.getElementById('answer-5').classList.remove('hover');
            } else {
                document.getElementById('answer-6').classList.remove('hover');
                document.getElementById('answer-7').classList.remove('hover');
                document.getElementById('answer-8').classList.remove('hover');
                document.getElementById('answer-9').classList.remove('hover');
                document.getElementById('answer-10').classList.remove('hover');
                document.getElementById('answer-11').classList.remove('hover');
            }
            break;

        case 'open':
            if (data.team == 'one') {
                document.getElementById('answer-0').className += ' hover';
                document.getElementById('answer-1').className += ' hover';
                document.getElementById('answer-2').className += ' hover';
                document.getElementById('answer-3').className += ' hover';
                document.getElementById('answer-4').className += ' hover';
                document.getElementById('answer-5').className += ' hover';
            } else {
                document.getElementById('answer-6').className += ' hover';
                document.getElementById('answer-7').className += ' hover';
                document.getElementById('answer-8').className += ' hover';
                document.getElementById('answer-9').className += ' hover';
                document.getElementById('answer-10').className += ' hover';
                document.getElementById('answer-11').className += ' hover';
            }
            break;
    }
});