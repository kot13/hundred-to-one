const {ipcRenderer} = require('electron');
const Handlebars = require('handlebars');
let store = require('./store');

const content        = document.getElementById('content');
const roundSource    = document.getElementById('round-template').innerHTML;
const finalSource    = document.getElementById('final-template').innerHTML;
const settingsSource = document.getElementById('settings-template').innerHTML;
let template         = Handlebars.compile(roundSource);
content.innerHTML    = template(store.state);

const openTeamOne  = document.getElementById('open-team-one');
const openTeamTwo  = document.getElementById('open-team-two');
const openSettings = document.getElementById('open-settings');
const nextRound    = document.getElementById('next-round');


openTeamOne.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', {
        cmd: 'open-team',
        team: 'one'
    });
});

openTeamTwo.addEventListener('click', function (event) {
    ipcRenderer.send('asynchronous-message', {
        cmd: 'open-team',
        team: 'two'
    });
});

openSettings.addEventListener('click', function (event) {
    let template      = Handlebars.compile(settingsSource);
    content.innerHTML = template(store.state);
});

nextRound.addEventListener('click', function (event) {
    if (store.state.currentRound != 4) {
        store.state.roundAnswers = store.state.rounds[store.state.currentRound].answers;
    }
    store.state.currentRound++;

    if (store.state.currentRound != 5) {
        template          = Handlebars.compile(roundSource);
        content.innerHTML = template(store.state);
        init();
    } else {
        template          = Handlebars.compile(finalSource);
        content.innerHTML = template(store.state);
        finalInit();
    }

    ipcRenderer.send('asynchronous-message', {
        cmd: 'next-round'
    });
});

function init() {
    document.getElementById('open-answer-0').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 0
        });
    });
    document.getElementById('open-answer-1').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 1
        });
    });
    document.getElementById('open-answer-2').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 2
        });
    });
    document.getElementById('open-answer-3').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 3
        });
    });
    document.getElementById('open-answer-4').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 4
        });
    });
    document.getElementById('open-answer-5').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open-answer',
            index: 5
        });
    });

    document.getElementById('on-mistake-one-0').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'one',
            index: 0
        });
    });
    document.getElementById('on-mistake-one-1').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'one',
            index: 1
        });
    });
    document.getElementById('on-mistake-one-2').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'one',
            index: 2
        });
    });
    document.getElementById('on-mistake-two-0').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'two',
            index: 0
        });
    });
    document.getElementById('on-mistake-two-1').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'two',
            index: 1
        });
    });
    document.getElementById('on-mistake-two-2').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'on-mistake',
            team: 'two',
            index: 2
        });
    });

    document.getElementById('win-one').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'win',
            team: 'one'
        });
    });
    document.getElementById('win-two').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'win',
            team: 'two'
        });
    });
}

function finalInit() {
    document.getElementById('open-answer-0').addEventListener('click', openHandler);
    document.getElementById('open-answer-1').addEventListener('click', openHandler);
    document.getElementById('open-answer-2').addEventListener('click', openHandler);
    document.getElementById('open-answer-3').addEventListener('click', openHandler);
    document.getElementById('open-answer-4').addEventListener('click', openHandler);
    document.getElementById('open-answer-5').addEventListener('click', openHandler);
    document.getElementById('open-answer-6').addEventListener('click', openHandler);
    document.getElementById('open-answer-7').addEventListener('click', openHandler);
    document.getElementById('open-answer-8').addEventListener('click', openHandler);
    document.getElementById('open-answer-9').addEventListener('click', openHandler);
    document.getElementById('open-answer-10').addEventListener('click', openHandler);
    document.getElementById('open-answer-11').addEventListener('click', openHandler);

    document.getElementById('close-one').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'close',
            team: 'one'
        });
    });

    document.getElementById('close-two').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'close',
            team: 'two'
        });
    });

    document.getElementById('open-one').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open',
            team: 'one'
        });
    });

    document.getElementById('open-two').addEventListener('click', function (event) {
        ipcRenderer.send('asynchronous-message', {
            cmd: 'open',
            team: 'two'
        });
    });
}

function openHandler (event) {
    let index   = this.getAttribute('data-index');
    let titleId = 'input-answer-title-' + index;
    let costId  = 'input-answer-cost-' + index;

    let title = document.getElementById(titleId).value;
    let cost  = document.getElementById(costId).value;

    ipcRenderer.send('asynchronous-message', {
        cmd: 'final-open-answer',
        title: title,
        cost: cost,
        index: index
    });
}

init();