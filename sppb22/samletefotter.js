const timer = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const nextTestBtn = document.getElementById("nexttest")
const score1 = document.getElementById("td-1");
const score2 = document.getElementById("td-2");
const score3 = document.getElementById("td-3");

let startTime;
let stopTime = 0;
let timeoutID;
let time = 0;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    nextTestBtn.disabled = true;

  function startTimer() {
      displayTime ();
  };
  
  function stopTimer () {
    // sleep(500);
    clearInterval(time);
  };

// 時間を表示する関数
function displayTime() {
    ++time;

    sec = Math.floor(time % 6000 / 100); //秒 
    sec10 = Math.floor(sec / 10); //秒の10の位     
    sec1 = sec % 10; //秒の1の位 
    
    mSec = time % 100; //ミリ秒 
    mSec10 = Math.floor(mSec / 10) //ミリ秒の10の位 
    mSec1 = mSec % 10; //ミリ秒の1の位 

    document.form_sw.count.value =  '' +  sec10 + sec1 + "." + mSec10 + mSec1; 

    timeoutID = setTimeout(displayTime, 10);
    // console.log("time:", time)
    console.log("sec10:", sec10)
    if (sec10 == 1) {
      console.log("TRUE -----------------")
      clearInterval(timeoutID);
      document.form_sw.count.value =  '00.00'; 
    }
};



// スタートボタンがクリックされたら時間を進める
startBtn.addEventListener('click', () => {
    startTimer ();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
    nextTestBtn.disabled = true;

});



const timerVariable = 0;
console.log("document.form_sw.count.value:", document.form_sw.count.value)
console.log("document.form_sw.count.value type:", typeof document.form_sw.count.value)

// ストップボタンがクリックされたら時間を止める
stopBtn.addEventListener('click', function() {
    startBtn.disabled = true;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    nextTestBtn.disabled = false;
    clearInterval(timeoutID);
});

// リセットボタンがクリックされたら時間を0に戻す
resetBtn.addEventListener('click', function() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    nextTestBtn.disabled = true;
    time = 0;
    document.form_sw.count.value =  '00.00'; 
});


nextTestBtn.addEventListener('click', function () {
  if (time >= 300) {
    window.location.href = 'semitandem.html';
        score1.textContent = 1;
        score2.textContent = 0;
        score3.textContent = 0;
      }  else {
    window.location.href = 'gangetest.html';   
  };
  
});

