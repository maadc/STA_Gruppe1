$(function() {
    registerClock();
    setTime();
  });

  function registerClock() {
    setInterval(updateClock, 1000);
  }

  function updateClock() {
    setTime();
    setStopWatch();
  }

  var currentdate;
  function setTime() {
    currentdate = new Date();
    var datetime = + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();
   /* $("#time").text(datetime); */
    console.log(datetime);
  }

var stopWatchRunning = false;
var startTime;

$("#spielfeld").click(function() {
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
  var showDuration = (duration.getMinutes()<10?'0':'')  
                + duration.getMinutes() + ":"
                + (duration.getSeconds() <10?'0':'')
                + duration.getSeconds();
  $("#tracker").text(showDuration);
}
  
