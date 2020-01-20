(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let calculation = require("./calculation.js");
let getterDOM = require("./getterDOM.js");
let setterDOM = require("./setterDOM.js");

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
    setterDOM("ball", "style_left", left)
    setterDOM("ball", "style_bottom", bottom)
    
    ball.position.left = left;
    ball.position.bottom = bottom;
    ball.position.angle = angle;
}

function moveBall(angle, frametime) {
    let newLeft = ball.position.left + (calculation.getDirection(angle).x * ball.speed * frametime);
    let newBottom = ball.position.bottom + (calculation.getDirection(angle).y * ball.speed * frametime);

    saveBallValues(Math.round(newLeft), Math.round(newBottom), angle);
}

function speedIncrease() { // Increases the speed of the ball by 1
    ball.speed = ball.speed + 1;
    getterDOM("speed").innerHTML = ball.speed;
    return ball.speed;
}

module.exports = {
    ball: ball,
    saveBallValues: saveBallValues,
    ballReset: ballReset,
    moveBall: moveBall,
    speedIncrease: speedIncrease,
    ballSlowdown: ballSlowdown,
}
},{"./calculation.js":2,"./getterDOM.js":4,"./setterDOM.js":7}],2:[function(require,module,exports){
function collision(aX, aY, aWidth, aHeight, bX, bY, bWidth, bHeight) {
    let array = [aX, aY, aWidth, aHeight, bX, bY, bWidth, bHeight];

    for(const e of array){
        if (typeof e != "number"){
            return undefined;
        }
        
    }
    
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
    if ((x === 0 && y === 0) ||( x+y > 1)) {
        //keine Bewegung === keine Richung
        return undefined ;
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
   let randomAngle; 
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
let getterDOM = require("./getterDOM.js");

module.exports = {
    countPointRight: countPointRight,
    countPointLeft: countPointLeft,
}

function countPointRight() {
    const score_right = getterDOM("punktestandLinks");
    let scoreRight = parseInt(score_right.innerHTML);
    score_right.innerHTML = scoreRight + 1;
    let scoreRightNumber = parseInt(score_right + 1);
    return scoreRightNumber;
}

function countPointLeft() {
    const score_left = getterDOM("punktestandRechts");
    let scoreLeft = parseInt(score_left.innerHTML);
    score_left.innerHTML = scoreLeft + 1;
    let scoreLeftNumber = parseInt(score_left + 1);
    return scoreLeftNumber;
    
}
},{"./getterDOM.js":4}],4:[function(require,module,exports){
module.exports = (kommando) => {

    let spielfeld = document.getElementById("spielfeld");
    let pongbar_right = document.getElementById("pongbar_right");
    let pongbar_left = document.getElementById("pongbar_left");
    let ball = document.getElementById("ball");
    let speed = document.getElementById("speed");
    let tracker = document.getElementById("tracker");
    let punktestandLinks = document.getElementById("punktestandLinks");
    let punktestandRechts = document.getElementById ("punktestandRechts");

    let soundAbprallen = document.getElementById("soundAbprallen");
    let soundStart = document.getElementById("soundStart");
    let soundPunkt = document.getElementById("soundPunkt");
    let soundHintergrund = document.getElementById("soundHintergrund");

    switch(kommando){
        case "spielfeld": return spielfeld;
        case "spielfeld.offsetHeight": return spielfeld.offsetHeight;
        case "spielfeld.offsetWidth": return spielfeld.offsetWidth;
        
        case "pongbar_right": return pongbar_right;
        case "pongbar_right.style.top": return pongbar_right.style.top;

        case "pongbar_left": return pongbar_left;
        case "pongbar_left.style.top": return pongbar_left.style.top;

        case "ball": return ball;
        case "speed": return speed;
        case "tracker": return tracker;
        case "punktestandLinks": return punktestandLinks;
        case "punktestandRechts": return punktestandRechts;

        case "soundAbprallen": return soundAbprallen;
        case "soundStart": return soundStart;
        case "soundPunkt": return soundPunkt;
        case "soundHintergrund": return soundHintergrund;
    }
  
}
},{}],5:[function(require,module,exports){
//import all required functions
let startCounter = require("./timer.js").startCounter;
let counter = require("./counter.js");
let calculation = require("./calculation.js");
let pongbars = require("./pongbar.js");
let ballJS = require("./ball.js");
let getterDOM = require("./getterDOM.js");
let setterDOM = require("./setterDOM.js");
let playSound = require("./sound.js").playSound;


let frametimeBefore = Date.now();
let frametime; // in ms
let spielfeld = getterDOM("spielfeld");
let ballMoving = false;
let timerRunning = false;

function go() {
    document.onkeydown = function (e) {
        if (e.keyCode == 32) {
            ballMoving = true;
            startCounter(timerRunning);
            timerRunning = true;
            playSound("soundStart");
            playSound("soundHintergrund");
            // Increases the speed of the ball every 0.2 seconds
            setInterval(ballJS.speedIncrease, 200); 
            setterDOM("starttext", "innerHTML", "")
        }
    }
    getterDOM("spielfeld").onclick = function () {
        ballMoving = true;
        startCounter(timerRunning);
        timerRunning = true;
        playSound("soundStart");
        playSound("soundHintergrund");
        // Increases the speed of the ball every 0.2 seconds
        setInterval(ballJS.speedIncrease, 200); 
        setterDOM("starttext", "innerHTML", "")
    }
    if (ballMoving === true) {
        ballLogic(frametime);
    }
}

function setBallMovingTrue() {
    ballMoving = true;
    return ballMoving;
}

function ballLogic(frametime) {
    let ball = ballJS.ball;
    if (calculation.collision(ball.object.offsetLeft - 26, ball.object.offsetTop, ball.radius, ball.radius, 
        pongbars.right.object.offsetLeft, pongbars.right.object.offsetTop, pongbars.right.width, pongbars.right.height)) {
        //26 because the balls cooardinates start at the bottom right, insteat of the bottom left??
        //collision with right pong bar
        let newAngle = calculation.getAngle(-calculation.getDirection(ball.position.angle).x, calculation.getDirection(ball.position.angle).y)
        ballJS.moveBall(newAngle, frametime);
        playSound("soundAbprallen");
        return "collision with right pongbar";
    } else if (calculation.collision(ball.object.offsetLeft, ball.object.offsetTop, ball.radius, ball.radius, 
        pongbars.left.object.offsetLeft, pongbars.left.object.offsetTop, pongbars.left.width, pongbars.left.height)) {
        //collision with left pong bar
        let newAngle = calculation.getAngle(-calculation.getDirection(ball.position.angle).x, calculation.getDirection(ball.position.angle).y)
        ballJS.moveBall(newAngle, frametime);
        playSound("soundAbprallen");
        return "collision with left pongbar";
    } else if (ball.position.left >= spielfeld.offsetWidth - ball.object.offsetWidth) {
        //touches the right border
        counter.countPointRight();
        ballMoving = false;
        playSound("soundPunkt");
        setTimeout(setBallMovingTrue, 1000);
        ballJS.ballReset();
        return "touches with right border";
    } else if (ball.position.left <= ball.object.offsetWidth) {
        //touches the left border
        counter.countPointLeft();
        ballMoving = false;
        playSound("soundPunkt");
        setTimeout(setBallMovingTrue, 1000);
        ballJS.ballReset();
        return "touches with left border";
    } else if (ball.position.bottom >= spielfeld.offsetHeight - ball.object.offsetHeight) {
        //touches the top border
        let newAngle = calculation.getAngle(calculation.getDirection(ball.position.angle).x, -calculation.getDirection(ball.position.angle).y)
        ballJS.moveBall(newAngle, frametime);
        return "touches with top border";
    } else if (ball.position.bottom <= 0) {
        //touches the bottom border
        let newAngle = calculation.getAngle(calculation.getDirection(ball.position.angle).x, -calculation.getDirection(ball.position.angle).y)
        ballJS.moveBall(newAngle, frametime);
        return "touches with bottom border";
    } else if (ball.position.left < spielfeld.offsetWidth) {
        //ball is in game
        ballJS.moveBall(ball.position.angle, frametime);
        return "ball is still in game";
    }
}

function gameLoop() {
    //in dem Loop sollen alle regelmäßigen Events aufgerufen werden.

    let now = Date.now(); //gibt eine bestimmte Anzahl an Millisekunden aus. 
    frametime = (now - frametimeBefore) * 0.001;
    // Abhängigkeit von Frametime ist wichtig, weil selbst bei geringer Prozessorgeschwindigkeit
    // das Spiel nicht schneller laufen soll, als der Spieler es spielen kann. 
    // gleichzeitig bestimmt die frametime die Spielgeschwindigkeit.

    go();
    pongbars.checkPressedKeys(pongbars.pressedKeys);

    frametimeBefore = now;
}

window.onload = () => {
    setInterval(gameLoop, 0);
}


module.exports = {
    ballMoving: ballMoving,
    go: go,
    setBallMovingTrue: setBallMovingTrue,
}
},{"./ball.js":1,"./calculation.js":2,"./counter.js":3,"./getterDOM.js":4,"./pongbar.js":6,"./setterDOM.js":7,"./sound.js":8,"./timer.js":9}],6:[function(require,module,exports){
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
    /*  CalculatePosition berechnet die neue Position der Pongbar
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
},{"./getterDOM.js":4,"./setterDOM.js":7}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
let getterDOM = require("./getterDOM.js");

function playSound(kommando) {
    switch (kommando) {
        case "soundAbprallen":
            return play(getterDOM("soundAbprallen"));

        case "soundPunkt":
            return play(getterDOM("soundPunkt"));

        case "soundStart":
            return play(getterDOM("soundStart"));
            
        case "soundHintergrund":
            return play(getterDOM("soundHintergrund"));
    }
}

function play(sound) {
    return sound.play();
}

module.exports = {
    playSound: playSound,
    play: play,
}
},{"./getterDOM.js":4}],9:[function(require,module,exports){
//Timer-Funktionen
let startTime;
let getterDOM = require("./getterDOM.js");

//ruft die Funktion timeLoop() auf wenn timerRunning false ist
//ändert Variable start, setzt timerRunning auf true und returned timerRunning
function startCounter(timerRunning) {
  if (timerRunning === false) {
    startTime = new Date().getTime();
    timeLoop();
    timerRunning = true;
    return timerRunning;
  }
  return undefined
}

//berechnet die Variablen min und sec
//returned min und sec
function updateCounter(dif) {
  var sec = Math.floor(dif / 1000);
  var min = Math.floor(sec / 60);
  sec %= 60;
 
  return {
    min, sec
  };
}

//wandelt min und sec in String-Werte um
//setzt jeweils eine Null davor, solange der Wert <10 ist
//returned minString und secString
function translateTime(dif) {
  var minString;
  var secString;
  if (updateCounter(dif).min < 10) {
    minString = "0" + String(updateCounter(dif).min);
  } else {
    minString = String(updateCounter(dif).min);
  }

  if (updateCounter(dif).sec < 10) {
    secString = "0" + String(updateCounter(dif).sec);
  } else {
    secString = String(updateCounter(dif).sec);
  }

  return {
    minString, secString
  };
}

//setzt minString und secString zusammen
function setTime(dif) {
  let timeTracker = getterDOM("tracker");
  timeTracker.innerHTML = translateTime(dif).minString + ":" + translateTime(dif).secString;
  return timeTracker.innerHTML;
}

//aktualisiert Variable dif
//wiederholt setTime jede Sekunde
function timeLoop(){
  var dif = new Date().getTime() - startTime;
  setTime(dif);
  setTimeout(timeLoop, 1000);
}

module.exports = {
  startCounter: startCounter,
  updateCounter: updateCounter,
  translateTime: translateTime,
  setTime: setTime,
}
},{"./getterDOM.js":4}]},{},[5]);
