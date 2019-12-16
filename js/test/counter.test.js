jest.mock("../getterDOM.js");
jest.mock("../setterDOM.js");
let getterDOM = require("../getterDOM.js");
let countPointLeft = require("../counter.js").countPointLeft;
let countPointRight = require("../counter.js").countPointRight;

describe("function: countPointLeft", () => {
    it("should count a point when the ball touches the right border", () => {
        getterDOM.mockImplementation(() => 0);
        expect(countPointLeft()).toBe(1);
    })
})

describe("function: countPointRight", () => {
    it("should count a point when the ball touches the left border", () =>{
        getterDOM.mockImplementation(() => 0);
        expect(countPointRight()).toBe(1);
    })
})