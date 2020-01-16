let getterDOM = require("./getterDOM.js");

function playSound (kommando) {
    if (kommando === "soundAbprallen") {
        getterDOM("soundAbprallen").play();
        return soundAbprallen;
    } else if (kommando === "soundPunkt") {
        getterDOM("soundPunkt").play();
        return soundPunkt;
    } else if (kommando === "soundStart") {
        getterDOM("soundStart").play();
        return soundStart;
    } else if (kommando === "soundHintergrund") {
        getterDOM("soundHintergrund").play();
        return soundHintergrund;
    }
}


module.exports = {
    playSound: playSound,
}