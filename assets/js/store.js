let state = {
    currentRound: 1,
    teams: {
        one: "Смельчаки UCP",
        two: "Партнёры UCP"
    },
    score: {
        one: 0,
        two: 0,
        round: 0
    },
    rounds: [
        {
            mistake: {
                one: {
                    one: false,
                    two: false,
                    three: false
                },
                two: {
                    one: false,
                    two: false,
                    three: false
                }
            },
            answers: [
                {
                    title: "Трололо",
                    cost: 0,
                    visible: false
                },
                {
                    title: "Трололо",
                    cost: 0,
                    visible: false
                },
                {
                    title: "Трололо",
                    cost: 0,
                    visible: false
                },
                {
                    title: "Трололо",
                    cost: 0,
                    visible: false
                },
                {
                    title: "Трололо",
                    cost: 0,
                    visible: false
                },
                {
                    title: "Трололо",
                    cost: 0,
                    visible: false
                }
            ]
        },
    ]
};

module.exports.state = state;