const getDirection = require('./main.js').getDirection;
describe("function: getDirection", () => {
    [{
            input: 45,
            output: {
                x: 0.5,
                y: 0.5
            }
        },
        {
            input: 135,
            output: {
                x: 0.5,
                y: -0.5
            }
        },
        {
            input: 225,
            output: {
                x: -0.5,
                y: -0.5
            }
        },
        {
            input: 315,
            output: {
                x: -0.5,
                y: 0.5
            }
        },
        {
            input: 405,
            output: {
                x: 0.5,
                y: 0.5
            }
        },
        {
            input: -45,
            output: {
                x: -0.5,
                y: 0.5
            }
        }
    ].forEach(({
        input,
        output
    }) => {
        test(`direction of ${input}° angle`, () => {
            expect(getDirection(input)).toEqual({
                x: output.x,
                y: output.y
            })
        })
    })
})

describe("function: getAngle", () => {
    const getAngle = require('./main.js').getAngle;
    [{
            input: {
                x: 0.5,
                y: 0.5
            },
            output: 45
        },
        {
            input: {
                x: 0.5,
                y: -0.5
            },
            output: 135
        },
        {
            input: {
                x: -0.5,
                y: -0.5
            },
            output: 225
        },
        {
            input: {
                x: -0.5,
                y: 0.5
            },
            output: 315
        },
        {
            input: {
                x: -getDirection(60).x,
                y: getDirection(60).y
            },
            output: 300
        },{
        input: {
            x: -getDirection(90).x,
            y: getDirection(90).y
        },
        output: 270
    },{
        input: {
            x: getDirection(0).x,
            y: -getDirection(1).y
        },
        output: 180
    }
    ].forEach(({
        input,
        output
    }) => {
        test(`Angel of ${input.x} & ${input.y}`, () => {
            expect(getAngle(input.x, input.y)).toEqual(output)
        })
    })
})

describe("function: round", () => {
    const round = require('./main.js').round;

    test("round", () => {
        expect(round(0.12345)).toEqual(0.12)
    })
})