jest.mock("../getterDOM.js");
let getterDOM = require("../getterDOM.js");
let startCounter = require("../timer.js").startCounter;
let updateCounter = require("../timer.js").updateCounter;

test("Function: timerRunning", () => {
    getterDOM.mockImplementation( ()=> document.createElement("tracker") )
    expect(startCounter()).toBe(true);
})


test("Function: updateCounter", () => {
    expect(updateCounter(1000)).toEqual({"min": "00", "sec": "01"});
})
