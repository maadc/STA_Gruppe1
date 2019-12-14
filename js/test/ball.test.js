//Simuliere die Funktion, die aus getterDOM.js kommt
jest.mock("../getterDOM.js");
//Speichere die Funktion, die aus getterDOM.js kommt
let getterDOM = require("../getterDOM.js");


test("if spielfeld exists", () => {
    const spielfeld = document.createElement("spielfeld");
    spielfeld.style.width = "300px";
    expect(spielfeld.style.width).toBe("300px");
})

test("test", () => {
    //Simuliere das Spielfeld 100px x 100px ist
    getterDOM.mockImplementation(() => 100);
    //hole das ball-Objekt
    let ball = require("../ball.js").ball;
    
    //Erstelle ein Test-DOM
    document.body.innerHTML =
    '<div>' +
    '  <div id="ball" style="left: 100px"/></div>' +
    '</div>';

    ball.object = document.getElementById("ball");

    //setze ein Stil. Hier könnte auch ein Funktionsaufruf sein.
    ball.object.style.setProperty('left', '10px');

    expect(ball.object.style.left).toBe("10px");
})

test("ballReset", () => {
    //Simuliere das Spielfeld in Größe 300 x 300px
    getterDOM.mockImplementation(() => 300);
    //hole ball
    let ball = require("../ball.js").ball;

    //hole ballReset()
    let ballReset = require("../ball.js").ballReset;

    //Platziere den Ball in der Mitte
    ballReset();
    expect(ball.position.left && ball.position.bottom).toBe(150);
})

test("saveBallValues", () => {
    let saveBallValues = require("../ball.js").saveBallValues;
    let ball = require("../ball.js").ball;

    saveBallValues(100, 100, 20);
    expect(ball.position).toHaveProperty('left', 10, 'bottom', 100, 'angle', 20); //?

})

test("moveBall", () => {
    let moveBall = require("../ball.js").moveBall;
    let ball = require("../ball.js").ball;
    debugger;
    moveBall(10, 0.005);
    expect(ball.position).toHaveProperty('left', 10, 'bottom', 100, 'angle', 10);

})

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
