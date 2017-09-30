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
                    cost: 10
                },
                {
                    title: "Одиночная 2",
                    cost: 20
                },
                {
                    title: "Одиночная 3",
                    cost: 30
                },
                {
                    title: "Одиночная 4",
                    cost: 40
                },
                {
                    title: "Одиночная 5",
                    cost: 50
                },
                {
                    title: "Одиночная 6",
                    cost: 60
                }
            ]
        },
        {
            answers: [
                {
                    title: "Двойная 1",
                    cost: 10
                },
                {
                    title: "Двойная 2",
                    cost: 20
                },
                {
                    title: "Двойная 3",
                    cost: 30
                },
                {
                    title: "Двойная 4",
                    cost: 40
                },
                {
                    title: "Двойная 5",
                    cost: 50
                },
                {
                    title: "Двойная 6",
                    cost: 60
                }
            ]
        },
        {
            answers: [
                {
                    title: "Тройная 1",
                    cost: 10
                },
                {
                    title: "Тройная 2",
                    cost: 20
                },
                {
                    title: "Тройная 3",
                    cost: 30
                },
                {
                    title: "Тройная 4",
                    cost: 40
                },
                {
                    title: "Тройная 5",
                    cost: 50
                },
                {
                    title: "Тройная 6",
                    cost: 60
                }
            ]
        },
        {
            answers: [
                {
                    title: "Наоброт 1",
                    cost: 15
                },
                {
                    title: "Наоброт 2",
                    cost: 30
                },
                {
                    title: "Наоброт 3",
                    cost: 60
                },
                {
                    title: "Наоброт 4",
                    cost: 120
                },
                {
                    title: "Наоброт 5",
                    cost: 180
                },
                {
                    title: "Наоброт 6",
                    cost: 240
                }
            ]
        }
    ]
};

module.exports.state = state;