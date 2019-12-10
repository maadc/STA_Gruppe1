//Simuliere die Funktion, die aus getterDOM.js kommt
jest.mock("../getterDOM.js");
//Speichere die Funktion, die aus getterDOM.js kommt
let centerHalf = require("../getterDOM.js");


test(`if spielfeld exists`, () => {
    const spielfeld = document.createElement("spielfeld");
    spielfeld.style.width = "300px";
    expect(spielfeld.style.width).toBe("300px");
})

test(`test`, () => {
    centerHalf.mockImplementation(() => 100);
    let ball = require("../ball.js").ball;
    
    document.body.innerHTML =
    '<div>' +
    '  <div id="ball" style="left: 100px"/></div>' +
    '</div>';

    ball.object = document.getElementById("ball");
    ball.object.style.setProperty('left', '10px');
    expect(ball.object.style.left).toBe("10px"); // SUCCESS
})

test(`ballReset`, () => {
    //hole ballReset()
    let ballReset = require("../ball.js").ballReset;

    //Simuliere das Spielfeld 300 x 300px ist
    centerHalf.mockImplementation(() => 300);
    //hole ball
    let ball = require("../ball.js").ball;

    //Platziere den Ball in der Mitte
    ballReset();
    expect(ball.position.left && ball.position.bottom).toBe(150);
})