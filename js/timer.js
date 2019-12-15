//Timer-Funktionen
let start;
var timerRunning = false;

function startCounter() {
  if (timerRunning == false) {
    start = new Date().getTime();
    setTime();
    timerRunning = true;
  }
}

function updateCounter() {
  var dif = new Date().getTime() - start;
  var sec = Math.floor(dif / 1000);
  var min = Math.floor(sec / 60);
  sec %= 60;
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return { min, sec };
}

function setTime() {
  document.getElementById("tracker").innerHTML = updateCounter().min + ":" + updateCounter().sec;
  setTimeout(setTime, 1000);
}

module.exports = {
  startCounter: startCounter,
}