let getterDOM = require("./getterDOM.js");
var keysDown = {};

let pongbar_right = {
    object: getterDOM("pongbar_right"),
    position: {
        right: 20, //in px
        top:250, //in px
    },
    height:250, //in px
    width: 20, //in px
}

let pongbar_left = {
    object: getterDOM("pongbar_left"),

    position: {
        left: 20, //in px
        top:250, //in px
    },
    height: 250, //in px    
    width: 20, //in px
}

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
}, false);
window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
}, false);

function checkPressedKeys(keysDown) {
    let down = 40;
    let w = 87;
    let up = 38;
    let s = 83;
    if (down in keysDown && w in keysDown) {
        if (testing){
            return 0;
        }
        calculatePosition(pongbar_right, false);
        calculatePosition(pongbar_left, true);
    }

    else if (down in keysDown && s in keysDown) {
        if (testing){
            return 0;
        }
        calculatePosition(pongbar_right, false);
        calculatePosition(pongbar_left, false);
    }

    else if (up in keysDown && s in keysDown) {
        if (testing){
            return 0;
        }
        calculatePosition(pongbar_right, true);
        calculatePosition(pongbar_left, false);
    }

    else if (up in keysDown && w in keysDown) {
        if (testing){
            return 0;
        }
        calculatePosition(pongbar_right, true);
        calculatePosition(pongbar_left, true);
    }

    else if (up in keysDown) {
        if (testing){
            return 0;
        }
        calculatePosition(pongbar_right, true);
    }

    else if (down in keysDown) {
        if(testing) {
            return 0;
        }
        calculatePosition(pongbar_right, false);
    }

    else if (s in keysDown) {
        if (testing){
            return 0;
        }
        calculatePosition(pongbar_left, false);
    }

    else if (w in keysDown) {
        calculatePosition(pongbar_left, true);
    }
}


function calculatePosition(pongbar, directionUp) {
    /*  CalculatePosition berechnet die neue Position der Pongbar
        Wenn directionUp = true  :  Pongbar bewegt sich nach OBEN
        Wenn directionUp = false :  Pongbar bewegt sich nach UNTEN
    */
    const speed = 2;
    let spielfeld = getterDOM("spielfeld");

    //Findet er nicht
    let pos = parseInt(pongbar.object.style.top);

    if (directionUp) {
        pos -= speed;
    } else {
        pos += speed;
    }

    //Oberer Rand
    if (pos < 0) {
        pos = 0;
    }

    //Unterer Rand
    else if ((parseInt(pongbar.object.style.height) + pos) > parseInt(spielfeld.offsetHeight)) {
        pos = spielfeld.offsetHeight - pongbar.object.style.height;
    }
    //Kanns nicht direkt Setzen
    pongbar.object.style.top = pos;
}

module.exports = {
    checkPressedKeys: checkPressedKeys,
    calculatePosition: calculatePosition,
    left: pongbar_left,
    right: pongbar_right
}