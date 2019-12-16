let getterDOM = require("../getterDOM.js");

const countPointRight = () => {
    const score_right = getterDOM("punktestandLinks");
    let scoreRight = parseInt(score_right);
    score_right = scoreRight + 1;
    return score_right;
}

const countPointLeft = () => {
    const score_left = getterDOM("punktestandRechts");
    let scoreLeft = parseInt(score_left);
    score_left = scoreLeft + 1;
    return score_left;
}

module.exports = {
    countPointRight: countPointRight,
    countPointLeft: countPointLeft,
}

