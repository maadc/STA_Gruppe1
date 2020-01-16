let playSound = require("../sound.js").playSound;
let getterDOM = require("../getterDOM.js");

describe("function: playSound", () => {
    //simuliere die HTML-Struktur aus unserer index.html
    document.body.innerHTML = `
    <audio id="soundAbprallen" preload="auto" >
        <source src="../sound/soundAbprallen.mp3" type="audio/mpeg" />
    </audio>
    <audio id="soundPunkt" preload="auto">
        <source src="../sound/soundPunkt.mp3" type="audio/mpeg" />
    </audio>
    <audio id="soundStart" preload="auto">
        <source src="../sound/soundStart.mp3" type="audio/mpeg" />
    </audio>
    <audio loop id="soundHintergrund" preload="auto">
        <source src="../sound/soundHintergrund.mp3" type="audio/mpeg" />
    </audio> 
    `; 

    test("soundAbprallen", () => {
        let soundAbprallen = getterDOM("soundAbprallen");
        expect(playSound("soundAbprallen")).toBe(soundAbprallen)
    })
    test("soundStart", () => {
        let soundStart = getterDOM("soundStart");
        expect(playSound("soundStart")).toBe(soundStart)
    })
    test("soundHintergrund", () => {
        let soundHintergrund = getterDOM("soundHintergrund");
        expect(playSound("soundHintergrund")).toBe(soundHintergrund)
    })
    test("soundPunkt", () => {
        let soundPunkt = getterDOM("soundPunkt");
        expect(playSound("soundPunkt")).toBe(soundPunkt)
    })
})