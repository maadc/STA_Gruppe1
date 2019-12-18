jest.mock("../getterDOM.js");
let getterDOM = require("../getterDOM.js");
let startCounter = require("../timer.js").startCounter;
let updateCounter = require("../timer.js").updateCounter;

test("Function: timerRunning", () => {
    getterDOM.mockImplementation( ()=> document.createElement("tracker") )
    expect(startCounter()).toBe(true);
})

describe('function: updateCounter', () => {
    test("sec should be +1", () => {
        expect(updateCounter(1000)).toEqual({"min": "00", "sec": "01"});
    })

    test("min should be +1", () => {
        expect(updateCounter(60000)).toEqual({"min": "01", "sec": "00"});
    })

    test("min should be +1 and sec should be +30", () => {
        expect(updateCounter(90000)).toEqual({"min": "01", "sec": 30});
    })
});

/* test("Function: setTime", () => {
    getterDOM.mockImplementation( ()=> document.createElement("tracker") )
    expect(tracker).toEqual({"Min:"});
})
*/
