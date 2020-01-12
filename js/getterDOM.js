module.exports = (kommando) => {

    let spielfeld = document.getElementById("spielfeld");
    let pongbar_right = document.getElementById("pongbar_right");
    let pongbar_left = document.getElementById("pongbar_left");
    let ball = document.getElementById("ball");
    let speed = document.getElementById("speed");
    let tracker = document.getElementById("tracker");
    let punktestandLinks = document.getElementById ("punktestandLinks");
    let punktestandRechts = document.getElementById ("punktestandRechts");

    switch(kommando){
        case "spielfeld": return spielfeld;
        case "spielfeld.offsetHeight": return spielfeld.offsetHeight;
        case "spielfeld.offsetWidth": return spielfeld.offsetWidth;
        
        case "pongbar_right": return pongbar_right;
        case "pongbar_right.style.top": return pongbar_right.style.top;

        case "pongbar_left": return pongbar_left;
        case "pongbar_left.style.top": return pongbar_left.style.top;

        case "ball": return ball;
        case "speed": return speed;
        case "tracker": return tracker;
        case "punktestandLinks": return punktestandLinks;
        case "punktestandRechts": return punktestandRechts;
    }
}