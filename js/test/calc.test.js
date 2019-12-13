const getDirection = require('../calculation.js').getDirection;
const round = require('../calculation.js').round;
const getAngle = require('../calculation.js').getAngle;
const collision = require('../calculation.js').collision;

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
        test(`Angle of ${input.x} & ${input.y}`, () => {
            expect(getAngle(input.x, input.y)).toEqual(output)
        })
    })
})

describe("function: round", () => {
    test("round", () => {
        expect(round(0.12345)).toEqual(0.12)
    })
})

describe("function: collision", () => {
    test("collision", () => {
        a = {
            x: 100,
            y: 100,
            width: 10,
            height: 10,
        }
        b = {
            x: 100,
            y: 110,
            width: 10,
            height: 10,
        }
        //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
        expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(true);
    })
})

