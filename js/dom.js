

let frametimeBefore = Date.now();
let frametime; // in ms
let spielfeld;
let pongbar_right;
let pongbar_left;
let ball;

var keysDown = {};

//initial function
function init() {
    spielfeld = document.getElementById("spielfeld")

    pongbar_right = document.getElementById("pongbar_right");
    pongbar_right.style.top = 250;
    pongbar_right.style.height = 200;

    pongbar_left = document.getElementById("pongbar_left");
    pongbar_left.style.top = 250;
    pongbar_left.style.height = 200;

    ball = {
        object: document.getElementById("ball"),
        position: {
            left: spielfeld.offsetHeight / 2, //in px
            bottom: spielfeld.offsetWidth / 2, //in px
            angle: 45, //in degrees.
        },
        speed: 500
    }
}

function ballLogic(frametime) {
    if (ball.position.left >= spielfeld.offsetWidth - ball.object.offsetWidth) {
        //touches the right border
        let newAngle = getAngle(-getDirection(ball.position.angle).x, getDirection(ball.position.angle).y)
        moveBall(newAngle, frametime);
        return;
    } else if (ball.position.left <= ball.object.offsetWidth) {
        //touches the left border
        let newAngle = getAngle(-getDirection(ball.position.angle).x, getDirection(ball.position.angle).y)
        moveBall(newAngle, frametime);
        return;
    } else if (ball.position.bottom >= spielfeld.offsetHeight - ball.object.offsetHeight) {
        //touches the top border
        let newAngle = getAngle(getDirection(ball.position.angle).x, -getDirection(ball.position.angle).y)
        moveBall(newAngle, frametime);
        return;
    } else if (ball.position.bottom <= 0) {
        //touches the bottom border
        let newAngle = getAngle(getDirection(ball.position.angle).x, -getDirection(ball.position.angle).y)
        moveBall(newAngle, frametime);
        return;
    } else if (ball.position.left < spielfeld.offsetWidth) {
        //ball is in game
        moveBall(ball.position.angle, frametime);
        return;
    }
}

//Test fehlt
function moveBall(angle, frametime) {
    let newBallPosition = {
        left: ball.position.left + (getDirection(angle).x * ball.speed * frametime),
        bottom: ball.position.bottom + (getDirection(angle).y * ball.speed * frametime),
        angle: angle,
    }
    ball.object.style.bottom = "" + newBallPosition.bottom;
    ball.object.style.left = "" + newBallPosition.left;

    saveBallValues(newBallPosition.left, newBallPosition.bottom, newBallPosition.angle);

}


function saveBallValues(left, bottom, angle) {
    ball.position.left = left;
    ball.position.bottom = bottom;
    ball.position.angle = angle;
}

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
    const speed = 12;
    let pos = parseInt(pongbar.style.top);

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
    else if ((parseInt(pongbar.style.height) + pos) > parseInt(spielfeld.offsetHeight)) {
        pos = spielfeld.offsetHeight - pongbar.style.height;
    }

    pongbar.style.top = pos;

}

function gameLoop() {
    //in dem Loop sollen alle regelmäßigen Events aufgerufen werden.

    let now = Date.now(); //gibt eine bestimmte Anzahl an Millisekunden aus. 
    frametime = (now - frametimeBefore) * 0.001;
    // Abhängigkeit von Frametime ist wichtig, weil selbst bei geringer Prozessorgeschwindigkeit
    // das Spiel nicht schneller laufen soll, als der Spieler es spielen kann. 
    // gleichzeitig bestimmt die frametime die Spielgeschwindigkeit.

    checkPressedKeys();

    ballLogic(frametime);

    frametimeBefore = now;
}

window.onload = () => {
    init();
    setInterval(gameLoop, 0);
}