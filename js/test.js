describe("getDirection of 6 different angles", () => {
    const getDirection = require('./main.js').getDirection;
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
].forEach(({input,output}) => {test(`direction of ${input}° angle`, () => {
            expect(getDirection(input)).toEqual({
                x: output.x,
                y: output.y
            })
        })
    })
})

describe("round", ()=>{
    const round = require('./main.js').round;

    test("round any number", () => {
        expect(round(0.12345)).toEqual(0.12)
})
})