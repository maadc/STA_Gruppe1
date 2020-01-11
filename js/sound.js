let getterDOM = require("./getterDOM.js");

function playSound (Kommando) {
    if (Kommando === "soundAbprallen") {
        getterDOM("soundAbprallen").play();
    } else if (Kommando === "soundPunkt") {
        getterDOM("soundPunkt").play();
    } else if (Kommando === "soundStart") {
        getterDOM("soundStart").play();
    }
}


module.exports = {
    playSound: playSound,
}