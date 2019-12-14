//Simuliere die Funktion, die aus getterDOM.js kommt
jest.mock("../getterDOM.js");
//Speichere die Funktion, die aus getterDOM.js kommt
let getterDOM = require("../getterDOM.js");

const calculatePosition = require('../pongbar.js').calculatePosition;

describe("function: calculatePosition", () =>{
    test("obererRand", () => {
        expect (calculatePosition (true,-10,250)).toBe(0);
    })
    test("if spielfeld exists", () => {
        const spielfeld = document.createElement("spielfeld");
        spielfeld.style.height = "500px";
        expect(spielfeld.style.height).toBe("500px");
    })
    test("untererRand", () =>{
        getterDOM.mockImplementation(() => 500);
        expect (calculatePosition (false,1000,250)).toBe(250);
    })
})

describe("function: checkedPressedKeys", () => {
    it("should pongbar move up, when w is pressed", () =>{
        let pongbar_left = require("../pongbar.js").left;
        let checkPressedKeys = require("../pongbar.js").checkPressedKeys;
        let keysDown = {40:true};
    }
    )
})