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

        go();
        pongbars.checkPressedKeys(pongbars.pressedKeys);

        frametimeBefore = now;

    }

    setInterval(gameLoop, 0);
}