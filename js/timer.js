//Timer-Funktionen
let startTime;
var timerRunning = false;
let getterDOM = require("./getterDOM.js");

//ruft die Funktion setTime() auf wenn timerRunning false ist
//ändert Variable start, setzt timerRunning auf true und returned timerRunning
function startCounter() {
  if (timerRunning == false) {
    startTime = new Date().getTime();
    setTime();
    timerRunning = true;
    return timerRunning;
  }
}

//berechnet die Variablen min und sec
//setzt jeweils eine Null davor, solange der Wert <10 ist
function updateCounter(dif) {
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

//setzt min und sec zusammen
//wiederholt setTime jede Sekunde
function setTime() {
var dif = new Date().getTime() - startTime;
 let timeTracker = getterDOM("tracker");
  timeTracker.innerHTML = updateCounter(dif).min + ":" + updateCounter(dif).sec;
  setTimeout(setTime, 1000);
}

module.exports = {
  startCounter: startCounter,
  timerRunning: timerRunning,
  updateCounter: updateCounter,
}