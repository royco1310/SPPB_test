
const timer = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const nextTestBtn = document.getElementById('nexttest');
const score1 = document.getElementById("td-1");
const score2 = document.getElementById("td-2");
const score3 = document.getElementById("td-3");

startBtn.disabled = false;
stopBtn.disabled = true;
resetBtn.disabled = true;
nextTestBtn.disabled = true;

let startTime;
let elapsedTime = 0;
let timerId;
let timeToadd = 0;
let flg = 0;
let ohno = 0;
let poeng = 0;
let s = 0;
let ms = 0;
let points = 0;


function updateTimetText(){
    let s = Math.floor(elapsedTime % 60000 / 1000);

    let ms = elapsedTime % 1000;

    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-2);

    timer.textContent = s + '.' + ms;
};


//再帰的に使える用の関数
function countUp(){

    timerId = setTimeout(function(){

        elapsedTime = Date.now() - startTime + timeToadd;
        updateTimetText()

        countUp();
        let s = Math.floor(elapsedTime % 60000 / 1000);

        let ms = elapsedTime % 1000;
    
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-2);
        
        if (s == 10 && flg == 0) {
          flg = 1;
          console.log('flg', flg)
          clearInterval(timerId);
          timer.textContent =  '10.00'; 
          score1.textContent = 1;
          startBtn.disabled = true;
          stopBtn.disabled = true;
          resetBtn.disabled = true;
          nextTestBtn.disabled = false;
        } else if (s == 10 && flg == 1) {
          flg = 2;
            console.log('flg', flg);
            clearInterval(timerId);
            timer.textContent =  '10.00'; 
            score2.textContent = 1;
            startBtn.disabled = true;
            stopBtn.disabled = true;
            resetBtn.disabled = true;
            nextTestBtn.disabled = false;
        } else if (s == 10 && flg == 2) {
            flg = 3;
            poeng = 4;
            console.log('poeng', poeng)
            console.log('flg',flg);
            clearInterval(timerId);
            timer.textContent =  '10.00'; 
            score3.textContent = 2;
            startBtn.disabled = true;
            stopBtn.disabled = true;
            resetBtn.disabled = true;
            nextTestBtn.disabled = false;
        }; 

    },10);
};

startBtn.addEventListener('click',function(){
    startTime = Date.now();
    countUp();

    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
    nextTestBtn.disabled = true;
  
   
});

stopBtn.addEventListener('click',function(){
    startBtn.disabled = true;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    nextTestBtn.disabled = false;
    clearInterval(timerId);
    let s = Math.floor(elapsedTime % 60000 / 1000);
    let ms = elapsedTime % 1000;
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-2);
      if (s < 10) {
        ohno = 1; 
        console.log('ohno',ohno);
  
      };

    if (flg == 2 && ohno == 1) {
      if (s > 2) {
      poeng = 3
      console.log('poeng', poeng);
      score3.textContent = 1;
      };

    };


});

resetBtn.addEventListener('click',function(){
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  nextTestBtn.disabled = true;
  elapsedTime = 0;
  timeToadd = 0;
  updateTimetText();
  ohno = 0;

 if (poeng == 3) {
    console.log('tandems point is reset now from 1 to 0');
    score3.textContent = 0;
    };

});


nextTestBtn.addEventListener('click', function () {
  if (flg == 0) {
    let points = 0; 
    window.location.href = 'gangetest.html?points=' + points;   
  } else if(flg == 1 && poeng==0) {
      poeng = 1;
      console.log('poeng',poeng);
      time = 0;
      timer.textContent =  '00.00'; 
      startBtn.disabled = false;
      stopBtn.disabled = true;
      resetBtn.disabled = true;
      nextTestBtn.disabled = true;
  } else if (flg == 1 && ohno == 1 && poeng ==1) {
    let points = 1; 
    window.location.href = 'gangetest.html?points='+ points;   
    } else if (flg == 2 && poeng == 1) {
      poeng = 2;
      console.log('poeng', poeng);
      time = 0;
      timer.textContent =  '00.00'; 
      startBtn.disabled = false;
      stopBtn.disabled = true;
      resetBtn.disabled = true;
      nextTestBtn.disabled = true;
    } else if (flg == 2 && ohno == 1 && poeng == 2) {
      let points = 2
    window.location.href = 'gangetest.html?points=' +points; 
    } else if (flg == 3) {
      let points = 4;
        window.location.href = 'gangetest.html?points=' +points;   
    } else if (poeng == 3) {
      let points = 3;
      window.location.href = 'gangetest.html?points=' +points;   
    };
});


/*
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
let flg = 0;
let sec1 = 0;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    nextTestBtn.disabled = true;

  function startTimer() {
      displayTime ();
  };
  
  function stopTimer () {
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
    console.log("sec10:", sec10)
    if (sec1 == 2 && flg == 0) {
      console.log("TRUE -----------------")
      clearInterval(timeoutID);
      flg = 1;
      score1.textContent = 1;
      startBtn.disabled = true;
      stopBtn.disabled = true;
      resetBtn.disabled = true;
      nextTestBtn.disabled = false;
    } else if (sec1 == 2 && flg == 1) {
        flg = 2;
        clearInterval(timeoutID);
        score2.textContent = 1;
        startBtn.disabled = true;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
        nextTestBtn.disabled = false;
    } else if (sec1 == 2 && flg == 2) {
        flg = 3;
        clearInterval(timeoutID);
        score3.textContent = 2;
        startBtn.disabled = true;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
        nextTestBtn.disabled = false;
    }; 

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

    
    if (sec1 < 2 && flg == 2) {
      console.log('OK-----------');
      score3.textContent = 1;
    };

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

  if (flg == 0) {
    window.location.href = 'gangetest.html';   
  } else if(flg == 1 && sec1 ==2) {
      time = 0;
      document.form_sw.count.value =  '00.00'; 
      startBtn.disabled = false;
      nextTestBtn.disabled = true;
  } else if (flg == 1 && sec1 < 2) {
    window.location.href = 'gangetest.html';   
    } else if (flg == 2 && sec1 == 2) {
      time = 0;
      document.form_sw.count.value =  '00.00'; 
      startBtn.disabled = false;
      nextTestBtn.disabled = true; 
    } else if (flg == 2 && sec1 < 2) {
    window.location.href = 'gangetest.html'; 
    } else if (flg == 3) {
        window.location.href = 'gangetest.html';   
    };
  
  });
*/