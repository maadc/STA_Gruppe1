jest.mock("../getterDOM.js");
let getterDOM = require("../getterDOM.js");
let startCounter = require("../timer.js").startCounter;
let updateCounter = require("../timer.js").updateCounter;
let translateTime = require("../timer.js").translateTime;
let setTime = require("../timer.js").setTime;

test("Function: timerRunning", () => {
    getterDOM.mockImplementation( ()=> document.createElement("tracker") )
    expect(startCounter()).toBe(true);
})

describe('function: updateCounter', () => {
    test("sec should be +1", () => {
        expect(updateCounter(1000)).toEqual({"min": 0, "sec": 1});
    })

    test("min should be +1", () => {
        expect(updateCounter(60000)).toEqual({"min": 1, "sec": 0});
    })

    test("min should be +1 and sec should be +30", () => {
        expect(updateCounter(90000)).toEqual({"min": 1, "sec": 30});
    })
});

describe('function: translateTime', () => {
    test("sec should be +1", () => {
        expect(translateTime(1000)).toEqual({"minString": "00", "secString": "01"});
    })

    test("min should be +1", () => {
        expect(updateCounter(60000)).toEqual({"min": 1, "sec": 0});
    })

    test("min should be +1 and sec should be +30", () => {
        expect(updateCounter(90000)).toEqual({"min": 1, "sec": 30});
    })
});

   test("function: setTime", () => {
    getterDOM.mockImplementation( ()=> document.createElement("tracker") )
    setTime();
    expect(document.getElementById("tracker").innerHTML).toBe("00:00") 
})

