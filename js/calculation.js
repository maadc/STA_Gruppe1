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
    do {
        randomAngle = Math.floor(Math.random() * 360);
    }
    while (randomAngle < 30 || 
        (randomAngle > 150 && randomAngle < 210) || 
        (randomAngle > 80 && randomAngle < 100) || 
        (randomAngle > 260 && randomAngle < 280) || 
        randomAngle > 330);
    return randomAngle;
}

module.exports = {
    collision: collision,
    getDirection: getDirection,
    getAngle: getAngle,
    round: round,
    calcRandomAngle: calcRandomAngle,
}
