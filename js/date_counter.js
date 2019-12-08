var stopWatchRunning = false;
var startTime;
var currentdate;

//Timer-Funktionen
function initTimer() {
    registerClock();
    setTime();
};

function registerClock() {
    setInterval(updateClock, 1000);
}

function updateClock() {
    setTime();
    setStopWatch();
}

function setTime() {
    currentdate = new Date();
    var datetime = +currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
}

$("#spielfeld").click(function () {
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
    var showDuration = (duration.getMinutes() < 10 ? '0' : '') +
        duration.getMinutes() + ":" +
        (duration.getSeconds() < 10 ? '0' : '') +
        duration.getSeconds();
    $("#tracker").text(showDuration);
}

//Counter
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
    initTimer: initTimer
}

