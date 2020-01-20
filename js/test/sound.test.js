let playSound = require("../sound.js");

jest.mock("../getterDOM.js");
let getterDOM = require("../getterDOM.js");

describe("function: playSound", () => {
    test("soundAbprallen", () => {
        const object = {
            play: () => {
                return "soundAbprallen called"
            }
        }
        getterDOM.mockImplementation(() => object);

        expect( playSound.playSound("soundAbprallen") ).toBe("soundAbprallen called");
    })
    
    test("soundStart", () => {
        const object = {
            play: () => {
                return "soundStart called"
            }
        }
        getterDOM.mockImplementation(() => object);

        expect( playSound.playSound("soundStart") ).toBe("soundStart called");
    })
    
    test("soundHintergrund", () => {
        const object = {
            play: () => {
                return "soundHintergrund called"
            }
        }
        getterDOM.mockImplementation(() => object);

        expect( playSound.playSound("soundHintergrund") ).toBe("soundHintergrund called");
    })

    test("soundPunkt", () => {
        const object = {
            play: () => {
                return "soundPunkt called"
            }
        }
        getterDOM.mockImplementation(() => object);

        expect( playSound.playSound("soundPunkt") ).toBe("soundPunkt called");
    }) 
})

describe('function: play', () => {
    test('play() should return the function play()', () => {
            const object = {
                play: () => {
                    return "play() called"
                }
            }
            getterDOM.mockImplementation(() => object);
            
            expect(playSound.play(object)).toBe("play() called");
    });
});