//Timer-Funktionen
let startTime;
let getterDOM = require("./getterDOM.js");

//ruft die Funktion timeLoop() auf wenn timerRunning false ist
//ändert Variable start, setzt timerRunning auf true und returned timerRunning
function startCounter(timerRunning) {
  if (timerRunning === false) {
    startTime = new Date().getTime();
    timeLoop();
    return timerRunning;
  }
  return undefined
}

//berechnet die Variablen min und sec
//returned min und sec
function updateCounter(dif) {
  var sec = Math.floor(dif / 1000);
  var min = Math.floor(sec / 60);
  sec %= 60;
 
  return {
    min, sec
  };
}

//wandelt min und sec in String-Werte um
//setzt jeweils eine Null davor, solange der Wert <10 ist
//returned minString und secString
function translateTime(dif) {
  var minString;
  var secString;
  if (updateCounter(dif).min < 10) {
    minString = "0" + String(updateCounter(dif).min);
  } else {
    minString = String(updateCounter(dif).min);
  }

  if (updateCounter(dif).sec < 10) {
    secString = "0" + String(updateCounter(dif).sec);
  } else {
    secString = String(updateCounter(dif).sec);
  }

  return {
    minString, secString
  };
}

//setzt minString und secString zusammen
function setTime(dif) {
  let timeTracker = getterDOM("tracker");
  timeTracker.innerHTML = translateTime(dif).minString + ":" + translateTime(dif).secString;
  return timeTracker.innerHTML;
}

//aktualisiert Variable dif
//wiederholt setTime jede Sekunde
function timeLoop(){
  var dif = new Date().getTime() - startTime;
  setTime(dif);
  setTimeout(timeLoop, 1000);
}

module.exports = {
  startCounter: startCounter,
  updateCounter: updateCounter,
  translateTime: translateTime,
  setTime: setTime,
}