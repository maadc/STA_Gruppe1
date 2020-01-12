jest.mock("../getterDOM.js");
jest.mock("../setterDOM.js");
jest.mock("../ball.js");

const ballJS = require("../ball.js");
const setterDOM = require("../setterDOM.js");
const getterDOM = require("../getterDOM.js");
let mainjs = require("../main.js")

test('function: setBallMovingTrue', () => {
    expect(mainjs.setBallMovingTrue()).toBe(true);
});

describe.skip('function: go', () => {
    test("if ballMoving = true", () => {
        let spielfeld = {
            id: "spielfeld"
        }
        let ball = {
            object: {
                offsetLeft: 0,
                offsetRight: 0
            }
        }
        getterDOM.mockImplementation(() =>
            spielfeld
        );
        ballJS.mockImplementation(() =>
            ball
        );
        mainjs.ballMoving = true;
        mainjs.go()
        expect().toBe();

    })
});