
module.exports = (object,parameter, value) => {
    let ball = document.getElementById("ball");
    let pongbar_right = document.getElementById("pongbar_right");
    let pongbar_left = document.getElementById("pongbar_left");

    if (object === "ball"){
        if(parameter === "style_left"){
            ball.style.left = value;
        }
        if(parameter === "style_bottom"){
            ball.style.bottom = value;
        }
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