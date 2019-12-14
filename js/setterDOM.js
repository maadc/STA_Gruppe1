module.exports = (object,parameter, value) => {

    let spielfeld = document.getElementById("spielfeld");
    let pongbar_right = document.getElementById("pongbar_right");
    let pongbar_left = document.getElementById("pongbar_left");

    if (object === "spielfeld"){

    }

    if (object === "pongbar_left"){
        if (parameter === "style_top"){
            pongbar_left.style.top = value;
        }
    }

    if (object === "pongbar_right"){
        if (parameter === "style_top"){
            pongbar_right.style.top = value;
        }
    }
   
}