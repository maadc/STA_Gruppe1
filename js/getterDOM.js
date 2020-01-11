module.exports = (Kommando) => {

    let spielfeld = document.getElementById("spielfeld");
    let pongbar_right = document.getElementById("pongbar_right");
    let pongbar_left = document.getElementById("pongbar_left");
    let ball = document.getElementById("ball");
    let speed = document.getElementById("speed");
    let tracker = document.getElementById("tracker");
    let punktestandLinks = document.getElementById("punktestandLinks");
    let punktestandRechts = document.getElementById ("punktestandRechts");
    let soundAbprallen = document.getElementById("soundAbprallen");
    let soundStart = document.getElementById("soundStart");
    let soundPunkt = document.getElementById("soundPunkt");
  
    if (Kommando === "spielfeld.offsetHeight"){
        return spielfeld.offsetHeight;

    } else if (Kommando === "spielfeld.offsetWidth") {
        return spielfeld.offsetWidth;

    } else if (Kommando === "spielfeld") {
        return spielfeld;

    } else if (Kommando === "pongbar_right") {
        return pongbar_right;

    } else if (Kommando==="pongbar_left") {
        return pongbar_left;

    } else if (Kommando === "pongbar_right.style.top") {
        return pongbar_right.style.top;

    } else if (Kommando==="pongbar_left.style.top") {
        return pongbar_left.style.top;

    } else if  (Kommando==="ball") {
        return ball;

    } else if (Kommando==="speed") {
        return speed;

    } else if (Kommando==="tracker") {
        return tracker;

    } else if (Kommando==="punktestandLinks") {
        return punktestandLinks;

    } else if (Kommando ==="punktestandRechts") {
        return punktestandRechts;

    } else if (Kommando ==="soundAbprallen") {
        return soundAbprallen;

    } else if (Kommando ==="soundStart") {
        return soundStart;

    } else if (Kommando ==="soundPunkt") {
        return soundPunkt;

    } else if (Kommando ==="soundHintergrund") {
        return soundHintergrund;
        
    }
}