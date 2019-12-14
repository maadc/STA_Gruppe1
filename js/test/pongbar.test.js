//Simuliere die Funktion, die aus getterDOM.js kommt
jest.mock("../getterDOM.js");
jest.mock("../setterDOM.js");
//Speichere die Funktion, die aus getterDOM.js kommt
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
    it("should pongbar move up, when w is pressed", () =>{
        let keysDown = {87:true};

        checkPressedKeys(keysDown);
        expect(pongbar_left.position.top).toBe(1);
    })
})