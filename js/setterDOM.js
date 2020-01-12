module.exports = (object, parameter, value) => {
    let ball = document.getElementById("ball");
    let pongbar_right = document.getElementById("pongbar_right");
    let pongbar_left = document.getElementById("pongbar_left");
    let starttext = document.getElementById("starttext")

    if (object === "ball") {
        if (parameter === "style_left") {
            if (typeof value === "number") {
                ball.style.left = value + "px";
            } else {
                ball.style.left = value;
            }
            return ball.style.left;
        }
        
        if (parameter === "style_bottom") {
            if (typeof value === "number") {
                ball.style.bottom = value + "px";
            } else {
                ball.style.bottom = value;
            }
            return ball.style.bottom;
        }
    }

    if (object === "pongbar_left") {
        if (parameter === "style_top") {
            if (typeof value === "number") {
                pongbar_left.style.top = value + "px";
            } else {
                pongbar_left.style.top = value;
            }
            return pongbar_left.style.top;
        }
    }

    if (object === "pongbar_right") {
        if (parameter === "style_top") {
            if (typeof value === "number") {
                pongbar_right.style.top = value + "px";
            } else {
                pongbar_right.style.top = value;
            }
            return pongbar_right.style.top;
        }
    }

    if (object === "starttext" && parameter === "innerHTML"){
        if (typeof value != "string"){
            return undefined;
        }
        starttext.innerHTML = value;
        return starttext.innerHTML;
    }

}