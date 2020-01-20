let getterDOM = require("./getterDOM.js");

function playSound(kommando) {
    switch (kommando) {
        case "soundAbprallen":
            return play(getterDOM("soundAbprallen"));

        case "soundPunkt":
            return play(getterDOM("soundPunkt"));

        case "soundStart":
            return play(getterDOM("soundStart"));
            
        case "soundHintergrund":
            return play(getterDOM("soundHintergrund"));
    }
}

function play(sound) {
    return sound.play();
}

module.exports = {
    playSound: playSound,
    play: play,
}