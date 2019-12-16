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