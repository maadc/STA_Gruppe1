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