module.exports = (Kommando) => {

    let spielfeld = document.getElementById("spielfeld");
    let pongbar_right = document.getElementById("pongbar_right");
    let pongbar_left = document.getElementById("pongbar_left");


    if (Kommando === "spielfeld") {
        return spielfeld;
    } else if (Kommando === "spielfeld.offsetHeight") {
        return spielfeld.offsetHeight;
    } else if (Kommando === "spielfeld.offsetWidth") {
        return spielfeld.offsetWidth;
    } else if (Kommando === "pongbar_right") {
        return pongbar_right;
    }

}