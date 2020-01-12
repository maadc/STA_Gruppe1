let getterDOM = require("../getterDOM.js");

describe("function: getterDOM", () => {
    //simuliere die HTML-Struktur aus unserer index.html
    document.body.innerHTML = `
        <div id="spielfeld">
            <div class="pongbars" id="pongbar_left"></div>
            <div class="pongbars" id="pongbar_right"></div>
            <h1 id="tracker">00:00</h1>
            <div id="punktestandLinks">0</div>
            <div id="punktestandRechts">0</div>
            <div id="ball"></div>
            <div id="geschwindigkeit"> <inline id="speedtext">Speed: </inline><inline id="speed">500</inline></div>
            <div id="starttext">Press Space To Start</div>
        </div>
    `; 

    describe("spielfeld abfragen", () => {
        test("spielfeld", () => {
            expect(getterDOM("spielfeld").id).toBe("spielfeld")
        })
    
        test("spielfeld.offsetHeight", () => {
            expect(getterDOM("spielfeld.offsetHeight")).toBeNumber();
        })
    
        test("spielfeld.offsetWidth", () => {
            expect(getterDOM("spielfeld.offsetWidth")).toBeNumber();
        })
    })

    describe("pongbar left", () =>{
        test("pongbar_left", () => {
            expect(getterDOM("pongbar_left").id).toBe("pongbar_left")
        })
        test("pongbar_left.style.top", () => {
            expect(getterDOM("pongbar_left.style.top")).toBeString();
        })
    })

    describe("pongbar right", () =>{
        test("pongbar_right", () => {
            expect(getterDOM("pongbar_right").id).toBe("pongbar_right")
        })
        test("pongbar_right.style.top", () => {
            expect(getterDOM("pongbar_right.style.top")).toBeString();
        })
    })
    
    test("ball", () => {
        expect(getterDOM("ball").id).toBe("ball")
    })
    test("speed", () => {
        expect(getterDOM("speed").id).toBe("speed")
    })
    test("tracker", () => {
        expect(getterDOM("tracker").id).toBe("tracker")
    })
    test("punktestandLinks", () => {
        expect(getterDOM("punktestandLinks").id).toBe("punktestandLinks")
    })
    test("punktestandRechts", () => {
        expect(getterDOM("punktestandRechts").id).toBe("punktestandRechts")
    })
    describe("object is not in getter", () => {
        test("error", () => {
            expect(getterDOM("error")).toBe(undefined);
        })
    })
})