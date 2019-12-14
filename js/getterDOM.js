module.exports = (Kommando) => {

    let spielfeld = document.getElementById("spielfeld");
    let pongbar_right = document.getElementById("pongbar_right");
    let pongbar_left = document.getElementById("pongbar_left");
    let ball = document.getElementById("ball");
    let speed = document.getElementById("speed");

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
    } else if  (Kommando==="ball") {
        return ball;
    } else if (Kommando==="speed") {
        return speed;
    }

}