let spielfeld = document.getElementById("spielfeld");
let calculation = require("./calculation.js");
let mainJS = require("./main.js");

let ball = {
    object: document.getElementById("ball"),
    position: {
        left: spielfeld.offsetWidth / 2, //in px
        bottom: spielfeld.offsetHeight / 2, //in px
        angle: calculation.calcRandomAngle(), //in degrees.
    },
    speed: 500,
    radius: 26, //in px
}

function ballReset() { // Ball teleports to center and gets a new random Angle
    ball.position.bottom = ball.object.style.bottom = spielfeld.offsetHeight / 2;
    ball.position.left = ball.object.style.left = spielfeld.offsetWidth / 2;
    ball.position.angle = calculation.calcRandomAngle();
    ballSlowdown();
}

function ballSlowdown() {
    if(ball.speed > 700) { // Ball slows down when a point is scored and the Ball is very fast already
        ball.speed = Math.round((ball.speed / 1.5) / 50) * 50; // Rundet die Ballgeschwindigkeit auf ein Vielfaches von 50
    }
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
    document.getElementById("geschwindigkeit").innerHTML = ball.speed;
    return ball.speed;
}

module.exports = {
    ball: ball,
    ballReset: ballReset,
    moveBall: moveBall,
    speedIncrease: speedIncrease,
}