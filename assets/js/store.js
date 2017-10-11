let state = {
    currentRound: 1,
    teams: {
        one: {
            title: "Смельчаки UCP",
            visible: false
        },
        two: {
            title: "Партнёры UCP",
            visible: false
        }
    },
    score: {
        one: 0,
        two: 0,
        round: 0
    },
    rounds: [
        {
            answers: [
                {
                    title: "Одиночная 1",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Одиночная 2",
                    cost: 25,
                    visible: false
                },
                {
                    title: "Одиночная 3",
                    cost: 20,
                    visible: false
                },
                {
                    title: "Одиночная 4",
                    cost: 15,
                    visible: false
                },
                {
                    title: "Одиночная 5",
                    cost: 10,
                    visible: false
                },
                {
                    title: "Одиночная 6",
                    cost: 5,
                    visible: false
                }
            ]
        },
        {
            answers: [
                {
                    title: "Двойная 1",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Двойная 2",
                    cost: 25,
                    visible: false
                },
                {
                    title: "Двойная 3",
                    cost: 20,
                    visible: false
                },
                {
                    title: "Двойная 4",
                    cost: 15,
                    visible: false
                },
                {
                    title: "Двойная 5",
                    cost: 10,
                    visible: false
                },
                {
                    title: "Двойная 6",
                    cost: 5,
                    visible: false
                }
            ]
        },
        {
            answers: [
                {
                    title: "Тройная 1",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Тройная 2",
                    cost: 25,
                    visible: false
                },
                {
                    title: "Тройная 3",
                    cost: 20,
                    visible: false
                },
                {
                    title: "Тройная 4",
                    cost: 15,
                    visible: false
                },
                {
                    title: "Тройная 5",
                    cost: 10,
                    visible: false
                },
                {
                    title: "Тройная 6",
                    cost: 5,
                    visible: false
                }
            ]
        },
        {
            answers: [
                {
                    title: "Наоборот 1",
                    cost: 15,
                    visible: false
                },
                {
                    title: "Наоборот 2",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Наоборот 3",
                    cost: 60,
                    visible: false
                },
                {
                    title: "Наоборот 4",
                    cost: 120,
                    visible: false
                },
                {
                    title: "Наоборот 5",
                    cost: 180,
                    visible: false
                },
                {
                    title: "Наоборот 6",
                    cost: 240,
                    visible: false
                }
            ]
        }
    ],
    final: {
        score: {
            one: 0,
            two: 0
        },
        answers: [
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
            {
                visible: false
            },
        ]
    }
};

state.roundAnswers = state.rounds[0].answers;

function getState () {
    return state;
}

function setState (newState) {
    state = newState;
}

module.exports.getState = getState;
module.exports.setState = setState;