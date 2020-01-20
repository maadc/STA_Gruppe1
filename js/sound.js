let getterDOM = require("./getterDOM.js");

function playSound (kommando) {
    switch (kommando) {
        case "soundAbprallen": 
            getterDOM("soundAbprallen").play();
            return "soundAbprallen";
        case "soundPunkt":
            getterDOM("soundPunkt").play();
            return "soundPunkt";
        case "soundStart" :
            getterDOM("soundStart").play();
            return "soundStart";
        case "soundHintergrund" :
            getterDOM("soundHintergrund").play();
            return "soundHintergrund";
    }
}

module.exports = {
    playSound: playSound,
}