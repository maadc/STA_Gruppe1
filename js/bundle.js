(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let calculation = require("./calculation.js");
let getterDOM = require("./getterDOM.js");

let ball = {
    object: getterDOM("ball"),
    position: {
        left: getterDOM("spielfeld.offsetWidth") / 2, //in px
        bottom: getterDOM("spielfeld.offsetHeight") / 2, //in px
        angle: calculation.calcRandomAngle(), //in degrees.
    },
    speed: 500,
    radius: 26, //in px
}

function ballReset() { // Ball teleports to center and gets a new random Angle
    let newBottom = getterDOM("spielfeld.offsetHeight") / 2;
    let newLeft = getterDOM("spielfeld.offsetWidth") / 2;
    let newAngle = calculation.calcRandomAngle();
    
    ball.object.style.bottom = newBottom;
    ball.object.style.left = newLeft;
   
    saveBallValues(newLeft, newBottom, newAngle);
    ballSlowdown();
}

function ballSlowdown() { 
    if(ball.speed > 700) { // Ball slows down when speed is higher than 700
        ball.speed = Math.floor(ball.speed / 1.5); // Divides the speed by 1.5 and rounds to a full number
    }
    return ball.speed;
}

function saveBallValues(left, bottom, angle) {
    ball.position.left = left;
    ball.position.bottom = bottom;
    ball.position.angle = angle;
}

function moveBall(angle, frametime) {
    let newBallPosition = {
        left: ball.position.left + (calculation.getDirection(angle).x * ball.speed * frametime),
        bottom: ball.position.bottom + (calculation.getDirection(angle).y * ball.speed * frametime),
        angle: angle,
    }
    ball.object.style.bottom = "" + Math.round(newBallPosition.bottom);
    ball.object.style.left = "" + Math.round(newBallPosition.left);

    saveBallValues(newBallPosition.left, newBallPosition.bottom, newBallPosition.angle);
}

function speedIncrease() { // Increases the speed of the ball by 1
    ball.speed = ball.speed + 1;
    getterDOM("speed").innerHTML = ball.speed;
    return ball.speed;
}

module.exports = {
    ball: ball,
    ballReset: ballReset,
    moveBall: moveBall,
    speedIncrease: speedIncrease,
    saveBallValues: saveBallValues,
    ballSlowdown: ballSlowdown,
}
},{"./calculation.js":2,"./getterDOM.js":4}],2:[function(require,module,exports){
function collision(aX, aY, aWidth, aHeight, bX, bY, bWidth, bHeight) {
    if ((aX >= bX && aX <= bX + bWidth && aY >= bY && aY <= bY + bHeight) ||
        (bX >= aX && bX <= aX + aWidth && aY >= bY && aY <= bY + bHeight) ||
        (bX >= aX && bX <= aX + aWidth && bY >= aY && bY <= aY + aHeight) ||
        (aX >= bX && aX <= bX + bWidth && bY >= aY && bY <= aY + aHeight)) {
        return true;
    }
    return false;
}

function getDirection(directAngle) {
    //Umrechnung von einem Winkel in den dazugehörigen Vektor
    let x;
    let y;
    if (directAngle > 360) {
        directAngle = directAngle - 360;
    }
    if (directAngle < 0) {
        directAngle = 360 + directAngle;
    }
    let angle = (Math.PI / 180) * directAngle;

    if (directAngle <= 90) {
        let xa = Math.sin(angle);
        let ya = Math.cos(angle);

        x = xa / (xa + ya);
        y = ya / (xa + ya);
    } else if (directAngle <= 180) {
        let xa = Math.sin(angle);
        let ya = Math.cos(angle);

        x = xa / (xa + Math.abs(ya));
        y = ya / (xa + Math.abs(ya));
    } else if (directAngle <= 270) {
        let xa = Math.sin(angle);
        let ya = Math.cos(angle);

        x = xa / Math.abs(xa + ya);
        y = ya / Math.abs(xa + ya);
    } else if (directAngle <= 360) {
        let xa = Math.sin(angle);
        let ya = Math.cos(angle);

        x = xa / (Math.abs(xa) + ya);
        y = ya / (Math.abs(xa) + ya);
    }
    return {
        x: round(x),
        y: round(y),
    }
}

function getAngle(x, y) {
    //Umrechnung von einem Vektor in den dazugehörigen Winkel
    if ((x === 0 && y === 0) || (x === 1 && y === 1)) {
        //keine Bewegung === keine Richung
        return;
    }
    //wir können nicht durch 0 teilen, aber durch annähernd 0
    if (y === 0) {
        y = 0.00000001;
    }
    if (x === 0) {
        x = 0.00000001;
    }

    let alpha = Math.round((180 / Math.PI) * Math.atan(x / y));
    let angle;

    //arctan hat nur einen Ergebnisbereich von 0 - 90° -> es müssen noch Anpassungen unternommen werden
    if (x > 0 && y > 0) {
        angle = alpha;
    } else if (y < 0) {
        angle = alpha + 180;
    } else if (x < 0) {
        angle = alpha + 360;
    }

    return angle;
}

function round(n) {
    // 2 decimal places
    let number = (Math.round(n * 100) / 100)
    return number;
}

function calcRandomAngle() { //Zufälliger Winkel, der senkrechte Winkel ausschließt.
    do
        randomAngle = Math.floor(Math.random() * 360);
    while (randomAngle < 30 || (randomAngle > 160 && randomAngle < 200) || randomAngle > 330);
    return randomAngle;
}

module.exports = {
    collision: collision,
    getDirection: getDirection,
    getAngle: getAngle,
    round: round,
    calcRandomAngle: calcRandomAngle,
}
},{}],3:[function(require,module,exports){
const countPointRight = () => {
    const score_right = document.getElementById("punktestandLinks");
    let scoreRight = parseInt(score_right.textContent);
    score_right.textContent = scoreRight + 1;
}

const countPointLeft = () => {
    const score_left = document.getElementById("punktestandRechts");
    let scoreLeft = parseInt(score_left.textContent);
    score_left.textContent = scoreLeft + 1;
}

module.exports = {
    countPointRight: countPointRight,
    countPointLeft: countPointLeft,
}


},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
//import all required functions
let startCounter = require("./timer.js").startCounter;
let counter = require("./counter.js");
let calculation = require("./calculation.js");
let pongbars = require("./pongbar.js");
let ballJS = require("./ball.js");
let ballMoving = false;

function setBallMovingTrue() {
    ballMoving = true;
    return ballMoving;
}

window.onload = () => {

    let frametimeBefore = Date.now();
    let frametime; // in ms
    let spielfeld = document.getElementById("spielfeld");
    let ball = ballJS.ball;

    function go() {
        document.onkeydown = function (e) {
            if (e.keyCode == 32) {
                ballMoving = true;
                startCounter();
                setInterval(ballJS.speedIncrease, 200); // Increases the speed of the ball every 0.2 seconds
                document.getElementById("starttext").innerHTML = "";
            }
        }
        spielfeld.onclick = function () {
            ballMoving = true;
            startCounter();
            setInterval(ballJS.speedIncrease, 200); // Increases the speed of the ball every 0.2 seconds
            document.getElementById("starttext").innerHTML = "";
        }
        if (ballMoving === true) {
            ballLogic(frametime);
        }
    }

    function ballLogic(frametime) {
        if (calculation.collision(ball.object.offsetLeft - 26, ball.object.offsetTop, ball.radius, ball.radius, pongbars.right.object.offsetLeft, pongbars.right.object.offsetTop, pongbars.right.width, pongbars.right.height)) {
            //26 because the balls cooardinates start at the bottom right, insteat of the bottom left??
            //collision with right pong bar
            let newAngle = calculation.getAngle(-calculation.getDirection(ball.position.angle).x, calculation.getDirection(ball.position.angle).y)
            ballJS.moveBall(newAngle, frametime);
            return;
        } else if (calculation.collision(ball.object.offsetLeft, ball.object.offsetTop, ball.radius, ball.radius, pongbars.left.object.offsetLeft, pongbars.left.object.offsetTop, pongbars.left.width, pongbars.left.height)) {
            //collision with left pong bar
            let newAngle = calculation.getAngle(-calculation.getDirection(ball.position.angle).x, calculation.getDirection(ball.position.angle).y)
            ballJS.moveBall(newAngle, frametime);
            return;
        } else if (ball.position.left >= spielfeld.offsetWidth - ball.object.offsetWidth) {
            //touches the right border
            counter.countPointRight();
            ballMoving = false;
            setTimeout(setBallMovingTrue, 1000);
            ballJS.ballReset();
            return;
        } else if (ball.position.left <= ball.object.offsetWidth) {
            //touches the left border
            counter.countPointLeft();
            ballMoving = false;
            setTimeout(setBallMovingTrue, 1000);
            ballJS.ballReset();
            return;
        } else if (ball.position.bottom >= spielfeld.offsetHeight - ball.object.offsetHeight) {
            //touches the top border
            let newAngle = calculation.getAngle(calculation.getDirection(ball.position.angle).x, -calculation.getDirection(ball.position.angle).y)
            ballJS.moveBall(newAngle, frametime);
            return;
        } else if (ball.position.bottom <= 0) {
            //touches the bottom border
            let newAngle = calculation.getAngle(calculation.getDirection(ball.position.angle).x, -calculation.getDirection(ball.position.angle).y)
            ballJS.moveBall(newAngle, frametime);
            return;
        } else if (ball.position.left < spielfeld.offsetWidth) {
            //ball is in game
            ballJS.moveBall(ball.position.angle, frametime);
            return;
        }
    }

    function gameLoop() {
        //in dem Loop sollen alle regelmäßigen Events aufgerufen werden.

        let now = Date.now(); //gibt eine bestimmte Anzahl an Millisekunden aus. 
        frametime = (now - frametimeBefore) * 0.001;
        // Abhängigkeit von Frametime ist wichtig, weil selbst bei geringer Prozessorgeschwindigkeit
        // das Spiel nicht schneller laufen soll, als der Spieler es spielen kann. 
        // gleichzeitig bestimmt die frametime die Spielgeschwindigkeit.

        pongbars.checkPressedKeys();

        go();

        frametimeBefore = now;

    }

    setInterval(gameLoop, 0);

}



},{"./ball.js":1,"./calculation.js":2,"./counter.js":3,"./pongbar.js":6,"./timer.js":7}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
//Timer-Funktionen
let start;
var timerRunning = false;

function startCounter() {
  if (timerRunning == false) {
    start = new Date().getTime();
    setTime();
    timerRunning = true;
  }
}

function updateCounter() {
  var dif = new Date().getTime() - start;
  var sec = Math.floor(dif / 1000);
  var min = Math.floor(sec / 60);
  sec %= 60;
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return { min, sec };
}

function setTime() {
  document.getElementById("tracker").innerHTML = updateCounter().min + ":" + updateCounter().sec;
  setTimeout(setTime, 1000);
}

module.exports = {
  startCounter: startCounter,
}
},{}]},{},[5]);
