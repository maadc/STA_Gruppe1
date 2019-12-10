let spielfeld = document.getElementById("spielfeld");
let calculation = require("./calculation.js");
let centerHalf = require("./getterDOM.js");

let ball = {
    object: document.getElementById("ball"),
    position: {
        left: centerHalf(true) / 2, //in px
        bottom: centerHalf(false) / 2, //in px
        angle: calculation.calcRandomAngle(), //in degrees.
    },
    speed: 500,
    radius: 26, //in px
}

function ballReset() { // Ball teleports to center and gets a new random Angle
    ball.position.bottom = ball.object.style.bottom = centerHalf(true) / 2;
    ball.position.left = ball.object.style.left = centerHalf(false) / 2;
    ball.position.angle = calculation.calcRandomAngle();
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

module.exports = {
    ball: ball,
    ballReset: ballReset,
    moveBall: moveBall,
}
