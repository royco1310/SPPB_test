const timer = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const nextBtn = document.getElementById("next");

let cnt = 0;
let timerId;
let point = 0;

function count() {
  cnt++;
  timer.textContent = cnt;
  console.log(cnt);
}

function startTimer() {
    timerId = setInterval(function(){ 
        count();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        nextBtn.disabled = true;
      
          if(cnt >= 5) {
          clearInterval(timerId);
          point = 2;
          console.log(point, 'point');
        startBtn.disabled = true;
        stopBtn.disabled = true;
        nextBtn.disabled = false;
        }
      },1000);
}      

function stopTimer() {
  clearInterval(timerId);
  startBtn.disabled = true;
  stopBtn.disabled = true;
  nextBtn.disabled = false;
  if(cnt >= 3) {
    point = 1;
    console.log(point, 'point');
  } else if (cnt < 2) {
    point = 0;
    console.log(point, 'point');
  };
}

function gotoNext() {
  window.location.href = 'total.html?point=' + point;
}

startBtn.addEventListener('click',function(){
  startTimer();
});

stopBtn.addEventListener('click',function(){
  stopTimer();
});

nextBtn.addEventListener('click',function(){
  gotoNext();
});




/*const timer = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const nextBtn = document.getElementById("next");

let cnt = 0;
let timerId;
let point = 0;

startBtn.disabled = false;
stopBtn.disabled = true;
nextBtn.disabled = true;

function count() {
  cnt++;
  timer.textContent = cnt;
  console.log(cnt);
}

function startTimer() {
    timerId = setInterval(function(){ 
        count();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        nextBtn.disabled = true;
      
          if(cnt >= 5) {
          clearInterval(timerId);
          point = 2;
          console.log(point, 'point');
        startBtn.disabled = true;
        stopBtn.disabled = true;
        nextBtn.disabled = false;
        }
      },1000);
}      

function stopTimer() {
  clearInterval(timerId);
  startBtn.disabled = true;
  stopBtn.disabled = true;
  nextBtn.disabled = false;
  if(cnt >= 3) {
    point = 1;
    console.log(point, 'point');
  } else if (cnt < 2) {
    point = 0;
    console.log(point, 'point');
  };
}

function gotoNext() {
  window.location.href = 'total.html';
}

startBtn.addEventListener('click',function(){
  startTimer();
});

stopBtn.addEventListener('click',function(){
  stopTimer();
});

nextBtn.addEventListener('click',function(){
  gotoNext();
});

*/