const countPointRight = () => {
    const score_right = document.getElementById("punktestandLinks");
    let scoreRight = parseInt(score_right.textContent);
    score_right.textContent = scoreRight + 1;
}

const countPointLeft = () => {
    const score_left = document.getElementById("punktestandRechts");
    let scoreLeft = parseInt(score_left.textContent);
    score_left.textContent = scoreLeft + 1;
}

module.exports = {
    countPointRight: countPointRight,
    countPointLeft: countPointLeft,
}

