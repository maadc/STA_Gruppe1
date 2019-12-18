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
 
  return {
    min, sec
  };
}

function translateTime(dif) {
  var minString;
  var secString;
  if (updateCounter(dif).min < 10) {
    minString = "0" + String(updateCounter(dif).min);
  }
  if (updateCounter(dif).sec < 10) {
    secString = "0" + String(updateCounter(dif).sec);
  }

  return {
    minString, secString
  };
}

//setzt min und sec zusammen
//wiederholt setTime jede Sekunde
function setTime() {
  var dif = new Date().getTime() - startTime;
  let timeTracker = getterDOM("tracker");
  timeTracker.innerHTML = translateTime(dif).minString + ":" + translateTime(dif).secString;
  setTimeout(setTime, 1000);
}

module.exports = {
  startCounter: startCounter,
  timerRunning: timerRunning,
  updateCounter: updateCounter,
  translateTime: translateTime,
  setTime: setTime,
}