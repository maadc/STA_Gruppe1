let playSound = require("../sound.js");
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
        const spy = jest.spyOn(playSound, 'play');
        
       playSound.playSound("soundAbprallen");
      
        expect(spy).toHaveBeenCalled();
      
        spy.mockRestore();
        //expect(playSound("soundAbprallen")).toBe("soundAbprallen")
    })
    test.skip("soundStart", () => {
        expect(playSound.playSound("soundStart")).toBe("soundStart")
    })
    test.skip("soundHintergrund", () => {
        expect(playSound("soundHintergrund")).toBe("soundHintergrund")
    })
    test.skip("soundPunkt", () => {
        expect(playSound("soundPunkt")).toBe("soundPunkt")
    })
})