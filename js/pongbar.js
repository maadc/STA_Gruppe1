var keysDown = {};

let pongbar_right = {
    object: document.getElementById("pongbar_right"),
    position: {
        right: 20, //in px
        top: 250, //in px
    },
    height: 200, //in px
    width: 20, //in px
}
pongbar_right.object.style.top = pongbar_right.position.top;
pongbar_right.object.style.height = pongbar_right.height

let pongbar_left = {
    object: document.getElementById("pongbar_left"),
    position: {
        left: 20, //in px
        top: 250, //in px
    },
    height: 200, //in px
    width: 20, //in px
}
pongbar_left.object.style.top = pongbar_left.position.top;
pongbar_left.object.style.height = pongbar_left.height

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
}, false);
window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
}, false);

function checkPressedKeys() {
    //DOWN(40) and W(87)
    if (40 in keysDown && 87 in keysDown) {
        calculatePosition(pongbar_right, false);
        calculatePosition(pongbar_left, true);
    }

    //DOWN(40) AND S(83)
    else if (40 in keysDown && 83 in keysDown) {
        calculatePosition(pongbar_right, false);
        calculatePosition(pongbar_left, false);
    }

    //UP(38) AND S(83)
    else if (38 in keysDown && 83 in keysDown) {
        calculatePosition(pongbar_right, true);
        calculatePosition(pongbar_left, false);
    }

    //UP(38) AND W(87)
    else if (38 in keysDown && 87 in keysDown) {
        calculatePosition(pongbar_right, true);
        calculatePosition(pongbar_left, true);
    }

    //Only UP(38)
    else if (38 in keysDown) {
        calculatePosition(pongbar_right, true);
    }

    //Only DOWN(40)
    else if (40 in keysDown) {
        calculatePosition(pongbar_right, false);
    }

    //Only S(83)
    else if (83 in keysDown) {
        calculatePosition(pongbar_left, false);
    }

    //Only W(87)
    else if (87 in keysDown) {
        calculatePosition(pongbar_left, true);
    }

}

function calculatePosition(pongbar, directionUp) {
    /*  CalculatePosition berechnet die neue Position der Pongbar
        Wenn directionUp = true  :  Pongbar bewegt sich nach OBEN
        Wenn directionUp = false :  Pongbar bewegt sich nach UNTEN
    */
    const speed = 2;
    let spielfeld = document.getElementById("spielfeld");
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

    pongbar.object.style.top = pos;

}

module.exports = {
    checkPressedKeys: checkPressedKeys,
    calculatePosition: calculatePosition,
    left: pongbar_left,
    right: pongbar_right
}