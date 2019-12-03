module.exports = {
    getDirection: getDirection,
    getAngle: getAngle,
    round: round
}

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
    // tolerance = the max amount of pixel a ball can move each iteration + 1 for safty
    const tolerance = ball.speed * frametime + 1;
    // border around the gamefield
    const spielfeldBorder = 8;
    if (ball.position.left + tolerance >= spielfeld.offsetWidth  - ball.object.offsetWidth) {
        //touches the right border
        let newAngle = getAngle(-getDirection(ball.position.angle).x, getDirection(ball.position.angle).y)
        moveBall(newAngle, frametime);
        countPointRight();
        return;
    } else if (ball.position.left <= 0 + tolerance) {
        //touches the left border
        let newAngle = getAngle(-getDirection(ball.position.angle).x, getDirection(ball.position.angle).y)
        moveBall(newAngle, frametime);
        countPointLeft();
        return;
    } else if (ball.position.bottom + ball.object.offsetHeight + tolerance >= spielfeld.offsetHeight - spielfeldBorder) {
        //touches the top border
        let newAngle = getAngle(getDirection(ball.position.angle).x, -getDirection(ball.position.angle).y)
        moveBall(newAngle, frametime);
        return;
    } else if (ball.position.bottom <= 0 + tolerance) {
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
    ball.object.style.bottom = "" + Math.round(newBallPosition.bottom);
    ball.object.style.left = "" + Math.round(newBallPosition.left);

    saveBallValues(newBallPosition.left, newBallPosition.bottom, newBallPosition.angle);

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
    
    function countPointRight() {
        const score_right = document.getElementById("punktestandRechts");
        let scoreRight = parseInt(score_right.textContent);
        score_right.textContent = scoreRight + 1;
    }

    function countPointLeft() {
        const score_left = document.getElementById("punktestandLinks");
        let scoreLeft = parseInt(score_left.textContent);
        score_left.textContent = scoreLeft + 1;
    }


    function calculatePosition(pongbar, directionUp) {
        /*  CalculatePosition berechnet die neue Position der Pongbar
            Wenn directionUp = true  :  Pongbar bewegt sich nach OBEN
            Wenn directionUp = false :  Pongbar bewegt sich nach UNTEN
        */
        const speed = 2;
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
  
  //Timer-Funktionen
  $(function() {
    registerClock();
    setTime();
  });

  function registerClock() {
    setInterval(updateClock, 1000);
  }

  function updateClock() {
    setTime();
    setStopWatch();
  }

  var currentdate;
  function setTime() {
    currentdate = new Date();
    var datetime = + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();
   /* $("#time").text(datetime); */
    console.log(datetime);
  }

var stopWatchRunning = false;
var startTime;

$("#spielfeld").click(function() {
  if (stopWatchRunning == false) {
    startTime = new Date();
    stopWatchRunning = true;
  }
});

function setStopWatch() {
  if (stopWatchRunning == false) {
    return;
  }
  var duration = new Date(currentdate - startTime);
  var showDuration = (duration.getMinutes()<10?'0':'')  
                + duration.getMinutes() + ":"
                + (duration.getSeconds() <10?'0':'')
                + duration.getSeconds();
  $("#tracker").text(showDuration);
}
window.onload = () => {
    init();
    setInterval(gameLoop, 0);
}