//Simuliere die Funktion, die aus getterDOM.js kommt
jest.mock("../getterDOM.js");
jest.mock("../setterDOM.js");
//Speichere die Funktion, die aus getterDOM.js kommt
let getterDOM = require("../getterDOM.js");
let setterDOM = require("../setterDOM.js");

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
    const checkPressedKeys = require("../pongbar.js").checkPressedKeys;
    const pongbar_left = require("../pongbar.js").left;
    it("should pongbar move up, when w is pressed", () =>{
        let keysDown = {87:true};
        setterDOM.mockImplementation(() => 700);

        checkPressedKeys(keysDown);
        expect(pongbar_left.position.top).toBe(1);
    })
})