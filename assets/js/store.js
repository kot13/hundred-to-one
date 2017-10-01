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
    roundAnswers: [
        {
            title: "Одиночная 1",
            cost: 10,
            visible: false
        },
        {
            title: "Одиночная 2",
            cost: 20,
            visible: false
        },
        {
            title: "Одиночная 3",
            cost: 30,
            visible: false
        },
        {
            title: "Одиночная 4",
            cost: 40,
            visible: false
        },
        {
            title: "Одиночная 5",
            cost: 50,
            visible: false
        },
        {
            title: "Одиночная 6",
            cost: 60,
            visible: false
        }
    ],
    rounds: [
        {
            answers: [
                {
                    title: "Одиночная 1",
                    cost: 10,
                    visible: false
                },
                {
                    title: "Одиночная 2",
                    cost: 20,
                    visible: false
                },
                {
                    title: "Одиночная 3",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Одиночная 4",
                    cost: 40,
                    visible: false
                },
                {
                    title: "Одиночная 5",
                    cost: 50,
                    visible: false
                },
                {
                    title: "Одиночная 6",
                    cost: 60,
                    visible: false
                }
            ]
        },
        {
            answers: [
                {
                    title: "Двойная 1",
                    cost: 10,
                    visible: false
                },
                {
                    title: "Двойная 2",
                    cost: 20,
                    visible: false
                },
                {
                    title: "Двойная 3",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Двойная 4",
                    cost: 40,
                    visible: false
                },
                {
                    title: "Двойная 5",
                    cost: 50,
                    visible: false
                },
                {
                    title: "Двойная 6",
                    cost: 60,
                    visible: false
                }
            ]
        },
        {
            answers: [
                {
                    title: "Тройная 1",
                    cost: 10,
                    visible: false
                },
                {
                    title: "Тройная 2",
                    cost: 20,
                    visible: false
                },
                {
                    title: "Тройная 3",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Тройная 4",
                    cost: 40,
                    visible: false
                },
                {
                    title: "Тройная 5",
                    cost: 50,
                    visible: false
                },
                {
                    title: "Тройная 6",
                    cost: 60,
                    visible: false
                }
            ]
        },
        {
            answers: [
                {
                    title: "Наоброт 1",
                    cost: 15,
                    visible: false
                },
                {
                    title: "Наоброт 2",
                    cost: 30,
                    visible: false
                },
                {
                    title: "Наоброт 3",
                    cost: 60,
                    visible: false
                },
                {
                    title: "Наоброт 4",
                    cost: 120,
                    visible: false
                },
                {
                    title: "Наоброт 5",
                    cost: 180,
                    visible: false
                },
                {
                    title: "Наоброт 6",
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
            {
                visible: false
            },
            {
                visible: false
            },
        ]
    }
};

module.exports.state = state;