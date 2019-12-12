//Simuliere die Funktion, die aus getterDOM.js kommt
jest.mock("../getterDOM.js");
//Speichere die Funktion, die aus getterDOM.js kommt
let getterDOM = require("../getterDOM.js");

const checkPressedKeys = require('../pongbar.js').checkPressedKeys;

describe("function: checkPressedKeys", () =>{
    test ("checkedPressedKeys", ()=>{
        let keysDown = {40:true, 87:true,};
        let testing = true;
        expect(checkPressedKeys(keysDown, testing)).toBe(0);
    })
    test ("checkedPressedKeys", ()=>{
        let keysDown = {40:true, 83:true,};
        let testing = true;
        expect(checkPressedKeys(keysDown, testing)).toBe(0);
    })
    test ("checkedPressedKeys", ()=>{
        let keysDown = {38:true, 83:true,};
        let testing = true;
        expect(checkPressedKeys(keysDown, testing)).toBe(0);
    })
    test ("checkedPressedKeys", ()=>{
        let keysDown = {38:true, 87:true,};
        let testing = true;
        expect(checkPressedKeys(keysDown, testing)).toBe(0);
    })
    test("checkPressedKeys", () => {
        let keysDown = {87: true,};
        let testing = true;
        expect(checkPressedKeys(keysDown, testing)).toBe(0);
    })
    test ("checkedPressedKeys", ()=>{
        let keysDown = {83:true,};
        let testing = true;
        expect(checkPressedKeys(keysDown, testing)). toBe(0);
    })
    test ("checkedPressedKeys", ()=>{
        let keysDown = {40:true,};
        let testing = true;
        expect(checkPressedKeys(keysDown, testing)). toBe(0);
    })
    test ("checkedPressedKeys", ()=>{
        let keysDown = {38:true,};
        let testing = true;
        expect(checkPressedKeys(keysDown, testing)). toBe(0);
    })
    
    
})