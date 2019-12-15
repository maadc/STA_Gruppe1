jest.mock("../getterDOM.js");
jest.mock("../setterDOM.js");
let getterDOM = require("../getterDOM.js");
let setterDOM = require("../setterDOM.js");

describe('function: ballReset', () => {
    test(`gamefield 300x300px`, () => {
        //Simuliere das Spielfeld 300 x 300px ist
        getterDOM.mockImplementation(() => 300);
        //hole ball
        let ball = require("../ball.js").ball;
    
        //hole ballReset()
        let ballReset = require("../ball.js").ballReset;
    
        //Platziere den Ball in der Mitte
        ballReset();
        expect(ball.position.left && ball.position.bottom).toBe(150);
    })
});

describe('function: SaveBallValues', () => {
    test("Values: 100left, 10bottom, 20°", () => {
        let saveBallValues = require("../ball.js").saveBallValues;
        let ball = require("../ball.js").ball;
    
        saveBallValues(100, 10, 20);
        expect(setterDOM).toBeCalledWith("ball", "style_left", 100);
        expect(setterDOM).toBeCalledWith("ball", "style_bottom", 10);
        expect(ball.position).toEqual({'left': 100, 'bottom': 10, 'angle': 20});
    })
});
describe('function: moveBall', () => {
    let moveBall = require("../ball.js").moveBall;
    let ball = require("../ball.js").ball;
    
    test("90°, 0.005frametime", () => {
        ball.position = {left: 150, bottom: 150, angle: 90}
        moveBall(90, 0.005);
        expect(ball.position).toEqual({'left': 153, 'bottom': 150, 'angle': 90});
    })
});

describe("Function: ballSlowdown", () => {
    test ("It should divide Ball speed by 1.5 if higher than 700", () => {
        let ball = require("../ball.js").ball;
        let ballSlowdown = require("../ball.js").ballSlowdown;
        ball.speed = 1500;
        expect(ballSlowdown()).toBe(1000);
    })
    
    test ("It should do nothing with ball.speed if lower than 700", () => {
        let ball = require("../ball.js").ball;
        let ballSlowdown = require("../ball.js").ballSlowdown;
        ball.speed = 100;
        expect(ballSlowdown()).toBe(100);
    })
})

describe("Function: speedIncrease", () => {
    test ("speed should increase by 1", () => {
        let speedIncrease = require("../ball.js").speedIncrease
        let ball = require("../ball.js").ball;
        ball.speed = 100;
        expect(speedIncrease()).toBe(101);
    })
})