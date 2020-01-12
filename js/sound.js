let getterDOM = require("./getterDOM.js");

function playSound (kommando) {
    if (kommando === "soundAbprallen") {
        getterDOM("soundAbprallen").play();
    } else if (kommando === "soundPunkt") {
        getterDOM("soundPunkt").play();
    } else if (kommando === "soundStart") {
        getterDOM("soundStart").play();
    } else if (kommando === "soundHintergrund") {
        getterDOM("soundHintergrund").play();
    }
}


module.exports = {
    playSound: playSound,
}