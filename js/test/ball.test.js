//Simuliere die Funktion, die aus getterDOM.js kommt
jest.mock("../getterDOM.js");
//Speichere die Funktion, die aus getterDOM.js kommt
let getterDOM = require("../getterDOM.js");


test(`if spielfeld exists`, () => {
    const spielfeld = document.createElement("spielfeld");
    spielfeld.style.width = "300px";
    expect(spielfeld.style.width).toBe("300px");
})

test(`test`, () => {
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

test(`ballReset`, () => {
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