window.onload = function () {
    
    //TODO: Größen der Pongbars und Spielfeld sollten in einer INIT-Funktion berechnet werden
    var pongbar_right = document.getElementById("pongbar_right");
    pongbar_right.style.top = 250;
    pongbar_right.style.height = 200;

    var pongbar_left = document.getElementById("pongbar_left");
    pongbar_left.style.top = 250;
    pongbar_left.style.height = 200;

    var spielfeld = document.getElementById("spielfeld");
    spielfeld.style.height = 800;

    var keysDown = {};

    window.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    }, false);
    window.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];
    }, false);

    const speed = 12;

    function gameLoop() {
        
        //DOWN(40) and W(87)
        if(40 in keysDown && 87 in keysDown) {
            calculatePosition(pongbar_right, false);
            calculatePosition(pongbar_left, true);
        }

        //DOWN(40) AND S(83)
        else if(40 in keysDown && 83 in keysDown) {
            calculatePosition(pongbar_right, false);
            calculatePosition(pongbar_left, false);
        }

        //UP(38) AND S(83)
        else if(38 in keysDown && 83 in keysDown) {
            calculatePosition(pongbar_right, true);
            calculatePosition(pongbar_left, false);
        }

        //UP(38) AND W(87)
        else if(38 in keysDown && 87 in keysDown) {
            calculatePosition(pongbar_right, true);
            calculatePosition(pongbar_left, true);
        }

        //Only UP(38)
        else if(38 in keysDown) {
            calculatePosition(pongbar_right, true);
        }

        //Only DOWN(40)
        else if(40 in keysDown) {
            calculatePosition(pongbar_right, false);
        }

        //Only S(83)
        else if(83 in keysDown) {
            calculatePosition(pongbar_left, false);
        }

        //Only W(87)
        else if(87 in keysDown) {
            calculatePosition(pongbar_left, true);
        }

    }

    /*  CalculatePosition berechnet die neue Position der Pongbar
        Wenn directionUp = true  :  Pongbar bewegt sich nach OBEN
        Wenn directionUp = false :  Pongbar bewegt sich nach UNTEN
    */

    function calculatePosition(pongbar, directionUp) {

        var pos = parseInt(pongbar.style.top);    250

        if(directionUp) {
            pos -= speed;                         238
        }

        else {
            pos += speed;                         262
        }

        //Oberer Rand
        if(pos < 0) {
            pos = 0; 
        }
          
        //Unterer Rand
        else if((parseInt(pongbar.style.height) + pos) > parseInt(spielfeld.style.height)) {
            pos = spielfeld.style.height - pongbar.style.height;
        }

        pongbar.style.top = pos;

    }

    setInterval(gameLoop, 30);
        
};
    