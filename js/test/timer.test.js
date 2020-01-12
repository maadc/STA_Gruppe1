jest.mock("../getterDOM.js");
let getterDOM = require("../getterDOM.js");
let startCounter = require("../timer.js").startCounter;
let updateCounter = require("../timer.js").updateCounter;
let translateTime = require("../timer.js").translateTime;
let setTime = require("../timer.js").setTime;

test("Function: timerRunning", () => {
    getterDOM.mockImplementation(() => document.createElement("tracker"))
    expect(startCounter()).toBe(true);
})

describe('function: updateCounter', () => {
    test("sec should be +1", () => {
        expect(updateCounter(1000)).toEqual({ "min": 0, "sec": 1 });
    })

    test("min should be +1", () => {
        expect(updateCounter(60000)).toEqual({ "min": 1, "sec": 0 });
    })

    test("min should be +1 and sec should be +30", () => {
        expect(updateCounter(90000)).toEqual({ "min": 1, "sec": 30 });
    })

    test("min should be +1 and sec should be +30", () => {
        expect(updateCounter(630000)).toEqual({ "min": 10, "sec": 30 });
    })
});

describe('function: translateTime', () => {
    test("sec should be +1", () => {
        expect(translateTime(1000)).toEqual({ "minString": "00", "secString": "01" });
    })

    test("sec should be +10", () => {
        expect(translateTime(10000)).toEqual({ "minString": "00", "secString": "10" });
    })

    test("min should be +1", () => {
        expect(translateTime(60000)).toEqual({ "minString": "01", "secString": "00" });
    })

    test("min should be +1 and sec should be +30", () => {
        expect(translateTime(90000)).toEqual({ "minString": "01", "secString": "30" });
    })
});

describe('function: setTimer', () => {
    test("sec should be +1", () => {
        let dif = 1000
        expect(setTime(dif)).toBe("00:01")
    })

    test("sec should be +59", () => {
        let dif = 59000
        expect(setTime(dif)).toBe("00:59")
    })

    test("min should be +10 and sec should be +5", () => {
        let dif = 605000
        expect(setTime(dif)).toBe("10:05")
    })
});
