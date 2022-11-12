
  /*
  if (time >= 10 && (score1.textContent = 1) && (score2.textContent = 1)) {
      score3.textContent = 2 ;
    console.log('おめでとう！4点目獲得！');
    windows.location.href = 'gangetest.html';
    } else if (time >= 10 && (score1.textContent = 1)) {
      score2.textContent = 1 ;
      console.log('おめでとう！2点目獲得！');
      time = 0;
      document.form_sw.count.value =  '00.00';
      startBtn.disabled = false;
      resetBtn.disabled = true;
      stopBtn.disabled = true;
      nextTestBtn.disabled = true;
    };
  });
  
  (score1.textContent = 1, score2.textContent = 1, time >=10) {
    score3.textContent = 2 ;
    console.log('おめでとう！4点目獲得！');
    window.location.href = 'gangetest.html';
  } else if (score1.textContent = 1, time >= 10) {
    score2.textContent = 1 ;
    console.log('おめでとう！2点目獲得！');
    time = 0;
    document.form_sw.count.value =  '00.00';
    startBtn.disabled = false;
    resetBtn.disabled = true;
    stopBtn.disabled = true;
    nextTestBtn.disabled = true;
  } else if (time >= 10) {
    score1.textContent = 1 ;
    console.log('おめでとう！１点獲得！');
    time = 0;
    document.form_sw.count.value =  '00.00'; 
    startBtn.disabled = false;
    resetBtn.disabled = true;
    stopBtn.disabled = true;
    nextTestBtn.disabled = true;
  };
  if(time >= 10) {
    score1.textContent = 1 ;
    console.log('おめでとう！１点獲得！');
    time = 0;
    document.form_sw.count.value =  '00.00'; 
    startBtn.disabled = false;
    resetBtn.disabled = true;
    stopBtn.disabled = true;
    nextTestBtn.disabled = true;


} else if (score1 = 1, time >= 10) {
    score2.textContent = 1 ;
    console.log('おめでとう！2点目獲得！');
    time = 0;
    document.form_sw.count.value =  '00.00';
    startBtn.disabled = false;
    resetBtn.disabled = true;
    stopBtn.disabled = true;
    nextTestBtn.disabled = true;


} else if (score2 = 1, time >=10) {
    score3.textContent = 2 ;
    console.log('おめでとう！4点目獲得！');
    windows.location.href = 'gangetest.html';
};
let cnt = 0;
let timerId;


function count () {
  cnt++;
  timer.textContent = cnt;
  console.log(cnt);
}

startBtn.addEventListener('click', () => {
  startTimer();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = true;
  nextTestBtn.disabled = true;
});

function startTimer () {
  timerId = setInterval(function(){ 
    count();
      if(cnt == 10) {
      clearInterval(timerId);
      console.log('10秒たったからとめるよ');
      startBtn.disabled = true;
      stopBtn.disabled = true;
      resetBtn.disabled = false;
      nextTestBtn.disabled = false;
    };
  },1000);
};


stopBtn.addEventListener('click', () => {
  stopTimer();
  startBtn.disabled = true;
  stopBtn.disabled = true;
  resetBtn.disabled = false;
  nextTestBtn.disabled = false;
});

function stopTimer () {
  clearInterval(timerId);
};

resetBtn.addEventListener('click', () => {
  resetTimer ();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  nextTestBtn.disabled = true;
});

function resetTimer () {
  clearInterval(timerId);
  timer.textContent = '0';
  cnt = 0;
};

nextTestBtn.addEventListener('click', () => {
  if (cnt >= 10) {
    resetTimer();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    nextTestBtn.disabled = true;
    score1.textContent = '1';
    console.log('点数あげるお');    
  } else {
    window.location.href = 'gangetest.html';
  };





});

    //スタートするときの関数
    let cnt = 0;
    let timerId;

    //０からカウントするための関数
    function count() {
      cnt++;
      timer.textContent = cnt;
      console.log(cnt);
      }

    function startTimer () {
      timerId = setInterval(function () { 
      count();
        if(cnt == 10) {
        clearInterval(timerId);
        score1.textContent = 1 ;
        console.log('おめでとう！１点獲得！');
        stopBtn.disabled = true;
        nextTestBtn.disabled = true;
    };
  
      startBtn.disabled = true;
      stopBtn.disabled = false;
      resetBtn.disabled = true;
      nextTestBtn.disabled = true;
    
    }, 1000);
    }

    //ストップするときの関数
    function stopTimer() {
      clearInterval(timerId);
      startBtn.disabled = false;
      stopBtn.disabled = true;
      resetBtn.disabled = false;
      nextTestBtn.disabled = false;
    
    };
    
    //リセットするときの関数
    function resetTimer() {
      clearInterval(timerId);
      timer.textContent = "0";
      cnt = 0;
      startBtn.disabled = false;
      stopBtn.disabled = true;
      resetBtn.disabled = true;
      nextTestBtn.disabled = true;
    
    };
    
    //以下４つのボタンを押したときのイベント処理
    startBtn.addEventListener('click',function(){
      startTimer();
    });

    stopBtn.addEventListener('click',function(){
      stopTimer();
    });
    
    resetBtn.addEventListener('click',function(){
      resetTimer();
    });    
    
    nextTestBtn.addEventListener('click', function () {
      if (cnt == 10) {
        resetTimer();
        console.log('次のバランステストいこー！');
        //semitandemTest();
      } else {
        window.location.href = "gangetest.html";
        console.log('残念だ、でも次の歩行テストで頑張ろう！');
      };
    });


//ここから上手くいっていない。ダブルカウントになりバグっている。

let startTime;
let timeoutId;

startBtn.addEventListener('click', () => {
  startTime = Date.now();
  countUp();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = true;
  nextTestBtn.disabled = true;

});

function countUp  () {
  const d = new Date(Date.now()-startTime);
  const s = String(d.getSeconds()).padStart(2,"0");
  const ms = String(d.getMilliseconds()).padStart(3,"0");
  timer.textContent = `${s}.${ms}`;

  timeoutId = setTimeout(() => {
    countUp();
  }, 10);
}

stopBtn.addEventListener('click', () => {
  clearTimeout(timeoutId);

  startBtn.disabled = true;
  stopBtn.disabled = true;
  resetBtn.disabled = false;
  nextTestBtn.disabled = false;

})

resetBtn.addEventListener('click', () => {
  timer.textContent = '00.00';
  stopTime = 0;

  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
  nextTestBtn.disabled = true;
})

*/