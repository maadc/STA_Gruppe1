let setterDOM = require("../setterDOM.js");

describe("function: setterDOM", () => {
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

    describe('ball style top', () => {
        test("100 as a number", () => {
            expect(setterDOM("ball", "style_left", 100)).toBe("100px");
        })
        test("100px as a string", () => {
            expect(setterDOM("ball", "style_left", "100px")).toBe("100px");
        })
    });
    
    describe('ball style bottom', () => {
        test("200 as a number", () => {
            expect(setterDOM("ball", "style_bottom", 200)).toBe("200px");
        })
        test("200px as a string", () => {
            expect(setterDOM("ball", "style_bottom", "200px")).toBe("200px");
        })
    });

    describe('pongbar_left style top', () => {
        test("100 as a number", () => {
            expect(setterDOM("pongbar_left", "style_top", 100)).toBe("100px");
        })
        test("100px as a string", () => {
            expect(setterDOM("pongbar_left", "style_top", "100px")).toBe("100px");
        })
    });

    describe('pongbar_right style top', () => {
        test("400 as a number", () => {
            expect(setterDOM("pongbar_right", "style_top", 400)).toBe("400px");
        })
        test("400px as a string", () => {
            expect(setterDOM("pongbar_right", "style_top", "400px")).toBe("400px");
        })
    });
    
    describe('starttext', () => {
        test('string', () => {
            expect(setterDOM("starttext", "innerHTML", "start")).toBe("start");
        });
        test('number', () => {
            expect(setterDOM("starttext", "innerHTML", 100)).toBe(undefined);
        });
    });
})