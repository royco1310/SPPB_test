const timer = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const nextTestBtn = document.getElementById('nexttest');
const score4 = document.getElementById("td-4");

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    nextTestBtn.disabled = true;


// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;

let time = 0;

// 時間を表示する関数
function displayTime() {
    ++time;

    sec = Math.floor(time % 6000 / 100); //秒 
    sec10 = Math.floor(sec / 10); //秒の10の位     
    sec1 = sec % 10; //秒の1の位 
    
    mSec = time % 100; //ミリ秒 
    mSec10 = Math.floor(mSec / 10) //ミリ秒の10の位 
    mSec1 = mSec % 10; //ミリ秒の1の位 

    document.form_sw.count.value =  '' + sec10 + sec1 + "." + mSec10 + mSec1; 

timeoutID = setTimeout(displayTime, 10);
}

// スタートボタンがクリックされたら時間を進める
startBtn.addEventListener('click', () => {
startBtn.disabled = true;
stopBtn.disabled = false;
resetBtn.disabled = true;
nextTestBtn.disabled = true;

displayTime();

});


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


// コンティニューボタンがクリックされたら、次のテストへいく
nextTestBtn.addEventListener('click', function () {
    window.location.href = 'reisesettetest.html'
});
