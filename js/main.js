window.onload = () => {
    let frametimeBefore = Date.now();
    let frametime; // in ms
    let spielfeld;
    let pongbar_right;
    let pongbar_left;
    let ball;

    var keysDown = {};

    //initial function
    function init() {
        
        spielfeld = document.getElementById("spielfeld");

        pongbar_right = {
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

        pongbar_left = {
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

        ball = {
            object: document.getElementById("ball"),
            position: {
                left: spielfeld.offsetWidth / 2, //in px
                bottom: spielfeld.offsetHeight / 2, //in px
                angle: calculation.calcRandomAngle(), //in degrees.
            },
            speed: 500,
            radius: 26, //in px
        }
    }

    function ballLogic(frametime) {
        if (calculation.collision(ball.object.offsetLeft - 26, ball.object.offsetTop, ball.radius, ball.radius, pongbar_right.object.offsetLeft, pongbar_right.object.offsetTop, pongbar_right.width, pongbar_right.height)) {
            //26 because the balls cooardinates start at the bottom right, insteat of the bottom left??
            //collision with right pong bar
            let newAngle = calculation.getAngle(-calculation.getDirection(ball.position.angle).x, calculation.getDirection(ball.position.angle).y)
            moveBall(newAngle, frametime);
            return
        } else if (calculation.collision(ball.object.offsetLeft, ball.object.offsetTop, ball.radius, ball.radius, pongbar_left.object.offsetLeft, pongbar_left.object.offsetTop, pongbar_left.width, pongbar_left.height)) {
            //collision with left pong bar
            let newAngle = calculation.getAngle(-calculation.getDirection(ball.position.angle).x, calculation.getDirection(ball.position.angle).y)
            moveBall(newAngle, frametime);
            return
        } else if (ball.position.left >= spielfeld.offsetWidth - ball.object.offsetWidth) {
            //touches the right border
            ballReset();
            date_counter.countPointRight();
            return;
        } else if (ball.position.left <= ball.object.offsetWidth) {
            //touches the left border
            ballReset();
            date_counter.countPointLeft();
            return;
        } else if (ball.position.bottom >= spielfeld.offsetHeight - ball.object.offsetHeight) {
            //touches the top border
            let newAngle = calculation.getAngle(calculation.getDirection(ball.position.angle).x, -calculation.getDirection(ball.position.angle).y)
            moveBall(newAngle, frametime);
            return;
        } else if (ball.position.bottom <= 0) {
            //touches the bottom border
            let newAngle = calculation.getAngle(calculation.getDirection(ball.position.angle).x, -calculation.getDirection(ball.position.angle).y)
            moveBall(newAngle, frametime);
            return;
        } else if (ball.position.left < spielfeld.offsetWidth) {
            //ball is in game
            moveBall(ball.position.angle, frametime);
            return;
        }
    }

    function ballReset(angle) { // Ball teleports to center and gets a new random Angle
        ball.position.bottom = ball.object.style.bottom = spielfeld.offsetHeight / 2;
        ball.position.left = ball.object.style.left = spielfeld.offsetWidth / 2;
        ball.position.angle = calculation.calcRandomAngle();

    }

    //Test fehlt
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

    function saveBallValues(left, bottom, angle) {
        ball.position.left = left;
        ball.position.bottom = bottom;
        ball.position.angle = angle;
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

    //TODO: Größen der Pongbars und Spielfeld sollten in einer INIT-Funktion berechnet werden

    var keysDown = {};

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

    init();
    date_counter.initTimer();
    setInterval(gameLoop, 0);
}
let date_counter = require("./date_counter.js");
let calculation = require("./calculation.js");