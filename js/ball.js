let spielfeld = document.getElementById("spielfeld");
let calculation = require("./calculation.js");
let getterDOM = require("./getterDOM.js");

let ball = {
    object: document.getElementById("ball"),
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
}

function saveBallValues(left, bottom, angle) {
    ball.position.left = left;
    ball.position.bottom = bottom;
    ball.position.angle = angle;
}

function moveBall(angle, frametime) {
    let newLeft = ball.position.left + (calculation.getDirection(angle).x * ball.speed * frametime);
    let newBottom = ball.position.bottom + (calculation.getDirection(angle).y * ball.speed * frametime);

    ball.object.style.bottom = Math.round(newBottom);
    ball.object.style.left = Math.round(newLeft);

    saveBallValues(newLeft, newBottom, angle);
}

module.exports = {
    ball: ball,
    saveBallValues: saveBallValues,
    ballReset: ballReset,
    moveBall: moveBall,
}
