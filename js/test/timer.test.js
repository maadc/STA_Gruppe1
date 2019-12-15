//Simuliere die Funktion, die aus getterDOM.js kommt
jest.mock("../getterDOM.js");
//Speichere die Funktion, die aus getterDOM.js kommt
let getterDOM = require("../getterDOM.js");
let startCounter = require("../timer.js").startCounter;
let updateCounter = require("../timer.js").updateCounter;
let sec;
let min;

test("Function: timerRunning", () => {
    getterDOM.mockImplementation( ()=> document.createElement("tracker") )
    expect(startCounter()).toBe(true);
})


test("Function: updateCounter", () => {
    expect(updateCounter(1000)).toEqual({"min": "00", "sec": "01"});
})
