jest.mock("../getterDOM.js");
jest.mock("../setterDOM.js");
let countPointLeft = require("../counter.js").countPointLeft;

describe("function: countPointLeft", () => {
    it("should count a point when the ball touches the right border", () => {
    scoreLeft=0;
    expect(countPointLeft()).toBe(1);
    })

})

describe("function: countPointRight", () => {
    it("should count a point when the ball touches the left border")
    let countPointRight = require("../counter.js").countPointRight;
    let scoreRight = require("../counter.js").scoreRight;
    scoreRight=0;
    expect(countPointRight(1)).toBe(1);
})