let getterDOM = require("./getterDOM.js");
let setterDOM = require("./setterDOM.js");
var pressedKeys = {};

let pongbar_right = {
    object: getterDOM("pongbar_right"),
    position: {
        right: 20, //in px
        top: (getterDOM("spielfeld.offsetHeight") / 2) - 125, //in px
    },
    height: 250, //in px
    width: 20, //in px
    speed: 2,
}

let pongbar_left = {
    object: getterDOM("pongbar_left"),
    position: {
        left: 20, //in px
        top: (getterDOM("spielfeld.offsetHeight") / 2) - 125, //in px
    },
    height: 250, //in px    
    width: 20, //in px
    speed: 2,
}

window.addEventListener("keydown", function (event) {
    pressedKeys[event.keyCode] = true;
}, false);

window.addEventListener("keyup", function (event) {
    delete pressedKeys[event.keyCode];
}, false);

function checkPressedKeys(keysDown) {
    let down = 40;
    let w = 87;
    let up = 38;
    let s = 83;

    if (down in keysDown && w in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(false, pongbar_right));
        setPongbarPosition(pongbar_left, calculatePosition(true, pongbar_left));

    } else if (down in keysDown && s in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(false, pongbar_right));
        setPongbarPosition(pongbar_left, calculatePosition(false, pongbar_left));

    } else if (up in keysDown && s in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(true, pongbar_right));
        setPongbarPosition(pongbar_left, calculatePosition(false, pongbar_left));

    } else if (up in keysDown && w in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(true, pongbar_right));
        setPongbarPosition(pongbar_left, calculatePosition(true, pongbar_left));

    } else if (up in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(true, pongbar_right));

    } else if (down in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(false, pongbar_right));

    } else if (s in keysDown) {
        setPongbarPosition(pongbar_left, calculatePosition(false, pongbar_left));

    } else if (w in keysDown) {
        setPongbarPosition(pongbar_left, calculatePosition(true, pongbar_left));

    }
}


function calculatePosition(directionUp, pongbar) {
    /*  CalculatePosition berechnet die Bewegungsrichtung der Pongbars
        Wenn directionUp = true  :  Pongbar bewegt sich nach OBEN
        Wenn directionUp = false :  Pongbar bewegt sich nach UNTEN
    */
    /* Position beinhaltet y Koordinaten*/

    let position = pongbar.position.top;
    const pongbarHeight = pongbar.height;
    const speed = pongbar.speed;

    if (directionUp) {
        position -= speed;
    } else {
        position += speed;
    }

    //Oberer Rand
    if (position < 0) {
        position = 0;
    }

    //Unterer Rand
    else if ((pongbarHeight + position) > getterDOM("spielfeld.offsetHeight")) {
        position = getterDOM("spielfeld.offsetHeight") - pongbarHeight;
    }    
    return position;

}

function setPongbarPosition(pongbar, position) {
     /*  
     setPongbarPosition berechnet die Position der Pongbars
    */
    if (pongbar == pongbar_left) {
        setterDOM("pongbar_left", "style_top", position);
    } else {
        setterDOM("pongbar_right", "style_top", position);
    }
    pongbar.position.top = position;
}

module.exports = {
    checkPressedKeys: checkPressedKeys,
    calculatePosition: calculatePosition,
    setPongbarPosition: setPongbarPosition,
    pressedKeys: pressedKeys,
    left: pongbar_left,
    right: pongbar_right
}