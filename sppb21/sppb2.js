//samlete føtter

var timeBegan = null
    , timeStopped = null
    , stoppedDuration = 0
    , started = null;

function start() {
    if (timeBegan === null) {
        timeBegan = new Date();
    }

    if (timeStopped !== null) {
        stoppedDuration += (new Date() - timeStopped);
    }
    console.log(stoppedDuration);

    started = setInterval(clockRunning, 10);	
}

function stop() {
    timeStopped = new Date();
    clearInterval(started);
}
 
function reset() {
    clearInterval(started);
    stoppedDuration = 0;
    timeBegan = null;
    timeStopped = null;
    document.getElementById("display-area").innerHTML = "00:00:00.000";
}

function clockRunning(){
    var currentTime = new Date()
        , timeElapsed = new Date(currentTime - timeBegan - stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();

    document.getElementById("display-area").innerHTML = 
        (hour > 9 ? hour : "0" + hour) + ":" + 
        (min > 9 ? min : "0" + min) + ":" + 
        (sec > 9 ? sec : "0" + sec) + "." + 
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);


};
 
//semitandem

var x;
var startstop = 0;

function startStop(){
    startStop = startStop + 1;

    if (startStop === 1) {
        start();
        document.getElementById("start").innerHTML = "stop";
    } else if (startStop === 2) {
        document.getElementById("start").innerHTML = "start";
        startStop = 0;
        stop();
        
    }
}

function start(){
x = setInterval(timer, 10);
}

function stop(){
    clearInterval(x);
}

var milisec = 0;
var sec = 0;
var min = 0;
var hour = 0;

var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;

function timer(){
    miliSecOut=CheckTime(milisec);
    secOut=CheckTime(sec);
    minOut=CheckTime(min);
    hourOut=CheckTime(hour);

    milisec= ++milisec;
    if (milisec === 100) {
        milisec=0;
        sec= ++sec;
    }
if (sec == 60) {
    min = ++min;
    sec=0;
}

if (min == 60) {
    min = 0;
    hour=++hour;
}

document.getElementById("milisec").innerHTML = miliSecOut;
document.getElementById("sec").innerHTML=secOut;
document.getElementsByTagName("min").innerHTML=minOut;
document.getElementsByTagName("hour").innerHTML=hourOut;
}


function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function reset() {
  
  
    /*Reset*/
  
    milisec = 0;
    sec = 0;
    min = 0
    hour = 0;
  
    document.getElementById("milisec").innerHTML = "00";
    document.getElementById("sec").innerHTML = "00";
    document.getElementById("min").innerHTML = "00";
    document.getElementById("hour").innerHTML = "00";
  
  }
  
