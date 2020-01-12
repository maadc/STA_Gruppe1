const getDirection = require('../calculation.js').getDirection;
const round = require('../calculation.js').round;
const getAngle = require('../calculation.js').getAngle;
const collision = require('../calculation.js').collision;
const randomAngle = require('../calculation.js').calcRandomAngle;

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
        },
        {
            input: 0,
            output: {
                x: 0,
                y: 1
            }
        },
        {
            input: 90,
            output: {
                x: 1,
                y: 0
            }
        },
        {
            input: 180,
            output: {
                x: 0,
                y: -1
            }
        },
        {
            input: 270,
            output: {
                x: -1,
                y: -0
            }
        },
        {
            input: 360,
            output: {
                x: -0,
                y: 1
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
                x: 0.5,
                y: 0
            },
            output: 90
        },
        {
            input: {
                x: 0,
                y: 0
            },
            output: undefined
        },
        {
            input: {
                x: 0.01,
                y: 0.01
            },
            output: 45
        },
        {
            input: {
                x: 1,
                y: 1
            },
            output: undefined
        },
        {
            input: {
                x: -getDirection(60).x,
                y: getDirection(60).y
            },
            output: 300
        }, 
        {
            input: {
                x: -getDirection(90).x,
                y: getDirection(90).y
            },
            output: 270
        }, 
        {
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
    test("collision true", () => {
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
    test("collision false", () => {
        a = {
            x: 100,
            y: 100,
            width: 10,
            height: 10,
        }
        b = {
            x: 60,
            y: 110,
            width: 10,
            height: 10,
        }
        //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
        expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(false);
    })
    test("collision with one boolean parameter", () => {
        a = {
            x: false,
            y: 100,
            width: 10,
            height: 10,
        }
        b = {
            x: 60,
            y: 110,
            width: 10,
            height: 10,
        }
        //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
        expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(undefined);
    })

    test("collision with more boolean parameter", () => {
        a = {
            x: 10,
            y: 100,
            width: true,
            height: 10,
        }
        b = {
            x: false,
            y: 110,
            width: true,
            height: 10,
        }
        //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
        expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(undefined);
    })
    test("collision with negative sizes", () => {
        a = {
            x: 10,
            y: 10,
            width: -2,
            height: -2,
        }
        b = {
            x: 11,
            y: 11,
            width: -2,
            height: -2,
        }
        //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
        expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(false);
    })
    test("obj. a = obj. b", () => {
        a = {
            x: 20,
            y: 20,
            width: 0,
            height: 0,
        }
        b = {
            x: 20,
            y: 20,
            width: 0,
            height: 0,
        }
        //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
        expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(true);
    })

    describe('first-or-statement', () => {
        test("normale values", () => {
            a = {
                x: 20,
                y: 20,
                width: 0,
                height: 0,
            }
            b = {
                x: 10,
                y: 10,
                width: 20,
                height: 20,
            }
            //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
            expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(true);
        })
        test('false values', () => {
            a = {
                x: 20,
                y: 20,
                width: 0,
                height: 0,
            }
            b = {
                x: 10,
                y: 10,
                width: 0,
                height: 0,
            }
            //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
            expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(false);
        });
    });

    describe('second or-statement', () => {
        test("normale values", () => {
            a = {
                x: 10,
                y: 20,
                width: 10,
                height: 0,
            }
            b = {
                x: 20,
                y: 10,
                width: 0,
                height: 10,
            }
            //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
            expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(true);
        })
        test("false values", () => {
            a = {
                x: 10,
                y: 10,
                width: 0,
                height: 0,
            }
            b = {
                x: 20,
                y: 20,
                width: 0,
                height: 0,
            }
            //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
            expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(false);
        })
    });

    describe('third or-statement', () => {
        test("normale values", () => {
            a = {
                x: 10,
                y: 10,
                width: 15,
                height: 0,
            }
            b = {
                x: 20,
                y: 10,
                width: 2,
                height: 0,
            }
            //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
            expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(true);
        })
        test("false values", () => {
            a = {
                x: 10,
                y: 20,
                width: 0,
                height: 0,
            }
            b = {
                x: 20,
                y: 10,
                width: 0,
                height: 0,
            }
            //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
            expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(false);
        })
    });
    describe('forth or-statement', () => {
        test("normale values", () => {
            a = {
                x: 20,
                y: 10,
                width: 0,
                height: 200,
            }
            b = {
                x: 10,
                y: 20,
                width: 20,
                height: 0,
            }
            //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
            expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(true);
        })
        test("false values", () => {
            a = {
                x: 20,
                y: 10,
                width: 0,
                height: 0,
            }
            b = {
                x: 10,
                y: 20,
                width: 0,
                height: 0,
            }
            //parameter: X, aY,aWidth, aHeight,bX, bY,bWidth, bHeight
            expect(collision(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height)).toBe(false);
        })
    });

})

describe("function: calcRandomAngle", () => {
    test("Number should be 30 or higher", () => {
        expect(randomAngle()).toBeGreaterThanOrEqual(30);
    })
    test("Number should be 330 or lower", () => {
        expect(randomAngle()).toBeLessThanOrEqual(330);
    })
})