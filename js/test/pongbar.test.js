jest.mock("../getterDOM.js");
jest.mock("../setterDOM.js");
let getterDOM = require("../getterDOM.js");
let setterDOM = require("../setterDOM.js");

const calculatePosition = require('../pongbar.js').calculatePosition;

describe("function: calculatePosition", () =>{
    test("obererRand", () => {
        let pongbar = {
            position: {
                top: -10,
            },
            height: 250,
            speed: 2,
        }
        expect(calculatePosition (true ,pongbar)).toBe(0);
    })

    test("untererRand", () =>{
        //simulate that the gamefield is 500px height.
        getterDOM.mockImplementation(() => 500);

        let pongbar = {
            position: {
                top: 1000,
            },
            height: 250,
            speed: 2,
        }
        expect (calculatePosition (false, pongbar)).toBe(250);
    })
})

describe("function: checkedPressedKeys", () => {
    const checkPressedKeys = require("../pongbar.js").checkPressedKeys;
    const pongbar_left = require("../pongbar.js").left;
    const pongbar_right = require("../pongbar.js").right;

    test("W-Key", () =>{
        let keysDown = {87:true};
        const predictedPostion = pongbar_left.position.top - pongbar_left.speed;

        checkPressedKeys(keysDown);
        expect(pongbar_left.position.top).toBe(predictedPostion);
    })
    test("S-Key", () =>{
        let keysDown = {83:true};
        const predictedPostion = pongbar_left.position.top + pongbar_left.speed;

        checkPressedKeys(keysDown);
        expect(pongbar_left.position.top).toBe(predictedPostion);
    })
    test("Arrow-Key UP", () =>{
        let keysDown = {38:true};
        const predictedPostion = pongbar_right.position.top - pongbar_right.speed;

        checkPressedKeys(keysDown);
        expect(pongbar_right.position.top).toBe(predictedPostion);
    })
    test("Arrow-Key DOWN", () =>{
        let keysDown = {40:true};
        const predictedPostion = pongbar_right.position.top + pongbar_right.speed;

        checkPressedKeys(keysDown);
        expect(pongbar_right.position.top).toBe(predictedPostion);
    })
    test("Arrow-Key UP + W-Key", () =>{
        let keysDown = {38:true, 87: true};
        const predictedPostionRight = pongbar_right.position.top - pongbar_right.speed;
        const predictedPostionLeft = pongbar_left.position.top - pongbar_left.speed;

        checkPressedKeys(keysDown);
        expect(pongbar_right.position.top).toBe(predictedPostionRight);
        expect(pongbar_left.position.top).toBe(predictedPostionLeft);
        
    })
    test("Arrow-Key UP + S-Key", () =>{
        let keysDown = {38:true, 83: true};
        const predictedPostionRight = pongbar_right.position.top - pongbar_right.speed;
        const predictedPostionLeft = pongbar_left.position.top + pongbar_left.speed;

        checkPressedKeys(keysDown);
        expect(pongbar_right.position.top).toBe(predictedPostionRight);
        expect(pongbar_left.position.top).toBe(predictedPostionLeft);
    })
    test("Arrow-Key DOWN + S-Key", () =>{
        let keysDown = {40:true, 83: true};
        const predictedPostionRight = pongbar_right.position.top + pongbar_right.speed;
        const predictedPostionLeft = pongbar_left.position.top + pongbar_left.speed;

        checkPressedKeys(keysDown);
        expect(pongbar_right.position.top).toBe(predictedPostionRight);
        expect(pongbar_left.position.top).toEqual(predictedPostionLeft);
    })
    test("Arrow-Key DOWN + W-Key", () =>{
        let keysDown = {40:true, 87: true};
        const predictedPostionRight = pongbar_right.position.top + pongbar_right.speed;
        const predictedPostionLeft = pongbar_left.position.top - pongbar_left.speed;

        checkPressedKeys(keysDown);
        expect(pongbar_right.position.top).toBe(predictedPostionRight);
        expect(pongbar_left.position.top).toBe(predictedPostionLeft);
    })
})

describe('function: setPongbarPosition', () => {
    const setPongbarPosition = require("../pongbar.js").setPongbarPosition;  
    const pongbar_left = require("../pongbar.js").left;
    const pongbar_right = require("../pongbar.js").right;

    test("Postion to 100px", () => {
        setPongbarPosition(pongbar_left, 100);
        expect(setterDOM).toBeCalledWith("pongbar_left", "style_top", 100);
        expect(pongbar_left.position.top).toBe(100);
    })
    test("Postion to -100px", () => {
        setPongbarPosition(pongbar_right, -100);
        expect(setterDOM).toBeCalledWith("pongbar_right", "style_top", -100);
        expect(pongbar_right.position.top).toBe(-100);
    })
});