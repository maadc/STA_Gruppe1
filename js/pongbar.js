let getterDOM = require("./getterDOM.js");
let setterDOM = require("./setterDOM.js");
var pressedKeys = {};

let pongbar_right = {
    object: getterDOM("pongbar_right"),
    position: {
        right: 20, //in px
        top: 250, //in px
    },
    height: 250, //in px
    width: 20, //in px
}

let pongbar_left = {
    object: getterDOM("pongbar_left"),

    position: {
        left: 20, //in px
        top: 250, //in px
    },
    height: 250, //in px    
    width: 20, //in px
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
        setPongbarPosition(pongbar_right, calculatePosition(false, pongbar_right.position.top, pongbar_right.height));
        setPongbarPosition(pongbar_left, calculatePosition(true, pongbar_left.position.top, pongbar_left.height));

    } else if (down in keysDown && s in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(false, pongbar_right.position.top, pongbar_right.height));
        setPongbarPosition(pongbar_left, calculatePosition(false, pongbar_left.position.top, pongbar_left.height));

    } else if (up in keysDown && s in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(true, pongbar_right.position.top, pongbar_right.height));
        setPongbarPosition(pongbar_left, calculatePosition(false, pongbar_left.position.top, pongbar_left.height));

    } else if (up in keysDown && w in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(true, pongbar_right.position.top, pongbar_right.height));
        setPongbarPosition(pongbar_right, calculatePosition(false, pongbar_right.position.top, pongbar_right.height));

    } else if (up in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(true, pongbar_right.position.top, pongbar_right.height));

    } else if (down in keysDown) {
        setPongbarPosition(pongbar_right, calculatePosition(false, pongbar_right.position.top, pongbar_right.height));

    } else if (s in keysDown) {
        setPongbarPosition(pongbar_left, calculatePosition(false, pongbar_left.position.top, pongbar_left.height));

    } else if (w in keysDown) {
        setPongbarPosition(pongbar_left, calculatePosition(true, pongbar_left.position.top, pongbar_left.height));

    }
}


function calculatePosition(directionUp, position, pongbarHeight) {
    /*  CalculatePosition berechnet die neue Position der Pongbar
        Wenn directionUp = true  :  Pongbar bewegt sich nach OBEN
        Wenn directionUp = false :  Pongbar bewegt sich nach UNTEN
    */
    /* Position beinhaltet y Koordinaten*/
    const speed = 2;
    let spielfeld = getterDOM("spielfeld");
    /*let pos = parseInt(pongbar.object.style.top);*/

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