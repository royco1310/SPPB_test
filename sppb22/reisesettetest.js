/*(function(){
    'use strict';

    //htmlのidからデータを取得
    //取得したデータを変数に代入
*/


let url = new URL(window.location.href);
let params = url.searchParams;
let pointg = params.get('pointg');
let besttime = params.get('besttime');


console.log(pointg, 'point from samletefotter og gangetest');
console.log(besttime, 'is your fastest time at your walking test');

    const timer = document.getElementById('timer');
    const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');
    const resetBtn = document.getElementById('reset');
    const totalBtn = document.getElementById('total');
    const score5 = document.getElementById('td-5');
    const styrke = document.getElementById('styrke1');
    

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    totalBtn.disabled = true;

    //クリック時の時間を保持するための変数定義
    let startTime;

    //経過時刻を更新するための変数。 初めはだから0で初期化
    let elapsedTime = 0;

    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    let timerId;

    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    let timeToadd = 0;

    let flggg = 0;

    let s = 0;

    //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
    let ms = 0;

    let point = 0;

    //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
    //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
    function updateTimetText(){

        //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
        //var m = Math.floor(elapsedTime / 60000);

        //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
        let s = Math.floor(elapsedTime % 70000 / 1000);

        //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
        let ms = elapsedTime % 1000;


        //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
        //javascriptでは文字列数列を連結すると文字列になる
        //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
        //m = ('0' + m).slice(-2); 
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-2);
       // ms = ('0' + ms).slice(-3);

        //HTMLのid　timer部分に表示させる　
        //timer.textContent = m + ':' + s + ':' + ms;
        timer.textContent = s + '.' + ms;
    };


    //再帰的に使える用の関数
    function countUp(){

        timerId = setTimeout(function(){
    
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()
    
            countUp();
            let s = Math.floor(elapsedTime % 70000 / 1000);
    
            let ms = elapsedTime % 1000;
        
            s = ('0' + s).slice(-2);
            ms = ('0' + ms).slice(-2);
            
            if (s == 60 && flggg == 0) {
              flggg = 1;
              console.log('flg', flggg)
              clearInterval(timerId);
              timer.textContent =  '60.00'; 
              startBtn.disabled = true;
              stopBtn.disabled = true;
              resetBtn.disabled = true;
              totalBtn.disabled = false;
              console.log("000000000");
            score5.textContent = 0;
            point = 0;
            console.log (point, 'point');
            }; 
    
        },10);
    };

    //startボタンにクリック時のイベントを追加(タイマースタートイベント)
    startBtn.addEventListener('click',function(){

        //在時刻を示すDate.nowを代入
        startTime = Date.now();

        //再帰的に使えるように関数を作る
        countUp();

        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = true;
        totalBtn.disabled = true;

     

});

    //stopボタンにクリック時のイベントを追加(タイマーストップイベント)
    stopBtn.addEventListener('click',function(){
        startBtn.disabled = true;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
        totalBtn.disabled = false;
        clearInterval(timerId);
        console.log(timerId);
        styrke.textContent = timer.textContent;
        getScore();
        sumScore();
    });

    function getScore (){
        let s = Math.floor(elapsedTime % 70000 / 1000);
        let ms = elapsedTime % 1000;
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-2);
        timer.textContent = s + '.' + ms;
        if (timer.textContent < 11.19) {
            score5.textContent = 4;
            point = 4;
            console.log(point, 'point');

        } else if (timer.textContent < 13.69) {
            point = 3;
            console.log(point, 'point');
            score5.textContent = 3;
        } else if (timer.textContent < 16.69) {
            point = 2;
            console.log(point, 'point');
            score5.textContent =2;
        } else if (timer.textContent > 16.7) {
            point = 1;
            console.log(ooint, 'point');
            score5.textContent = 1;
        };
    };

    function sumScore() {
        
        let sum = +pointg + +point;
        console.log(sum);
    };

    //resetボタンにクリック時のイベントを追加(タイマーリセットイベント)
    resetBtn.addEventListener('click',function(){

        //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
        elapsedTime = 0;

        //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
        timeToadd = 0;

        //updateTimetTextで0になったタイムを表示
        updateTimetText();

        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
        totalBtn.disabled = true;
        styrke.textContent = '00.00'
        score5.textContent = '0';

    });

    totalBtn.addEventListener('click', function () {
        
        let sum = +pointg + +point;
        window.location.href = 'totalscore.html?sum=' + sum + '&besttime=' + besttime;
    }); 























/*const timer = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const totalBtn = document.getElementById('total');
const score5 = document.getElementById("td-5");


    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    totalBtn.disabled = true;

let stopTime = 0;
let timeoutID; 
let time = 0;
let elapsedTime = 0;
let timeToadd = 0;


function startTime () {
    elapsedTime = Date.now();
    console.log(elapsedTime);
}




    const timer = document.getElementById('timer');
    const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');
    const resetBtn = document.getElementById('reset');
    const totalBtn = document.getElementById('total');
    //const score5 = document.getElementById('td-5');

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    totalBtn.disabled = true;

/*(function(){
    'use strict';

    //htmlのidからデータを取得
    //取得したデータを変数に代入

    var timer = document.getElementById('timer');
    var startBtn = document.getElementById('start');
    var stopBtn = document.getElementById('stop');
    var resetBtn = document.getElementById('reset');
    var totalBtn = document.getElementById('total');
    var score5 = document.getElementById('td-5');

    //クリック時の時間を保持するための変数定義
    let startTime;

    //経過時刻を更新するための変数。 初めはだから0で初期化
    let elapsedTime = 0;

    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    let timerId;

    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    let timeToadd = 0;


    //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
    //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
    function updateTimetText(){


        //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
        let s = Math.floor(elapsedTime % 60000 / 1000);

        //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
        let ms = elapsedTime % 1000;


        //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
        //javascriptでは文字列数列を連結すると文字列になる
        //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-2);
       // ms = ('0' + ms).slice(-3);

        //HTMLのid　timer部分に表示させる　
        timer.textContent = s + '.' + ms;
    }


    //再帰的に使える用の関数
    function countUp(){

        //timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function(){

            //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText();
            console.log('now im working-------');

            //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
            //countUp();

        //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
        },10);
    }

    //startボタンにクリック時のイベントを追加(タイマースタートイベント)
    startBtn.addEventListener('click',function(){
        console.log('hello world');
        //在時刻を示すDate.nowを代入
        //startTime = Date.now();

        //再帰的に使えるように関数を作る
        countUp();

        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = true;
        totalBtn.disabled = true;
    });

    //stopボタンにクリック時のイベントを追加(タイマーストップイベント)
    stopBtn.addEventListener('click',function(){

        //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
       clearTimeout(timerId);
       console.log('STOOOp-----------');


        //タイマーに表示される時間elapsedTimeが現在時刻かたスタートボタンを押した時刻を引いたものなので、
        //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
        //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
       timeToadd += Date.now() - startTime;
       startBtn.disabled = true;
       stopBtn.disabled = true;
       resetBtn.disabled = false;
       totalBtn.disabled = false;
    });

    //resetボタンにクリック時のイベントを追加(タイマーリセットイベント)
    resetBtn.addEventListener('click',function(){

        //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
        elapsedTime = 0;

        //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
        timeToadd = 0;

        //updateTimetTextで0になったタイムを表示
        updateTimetText();
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
        totalBtn.disabled = true;
        console.log('reset------------');
    });

    // コンティニューボタンがクリックされたら、次のテストへいく
    totalBtn.addEventListener('click', function () {
    window.location.href = 'totalscore.html'
});


/*)();

/*
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

function displayTime(){

    //timerId変数はsetTimeoutの返り値になるので代入する
    timeoutID = setTimeout(function(){

        //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
        elapsedTime = Date.now() - startTime + timeToadd;
        updateTimetText()

        //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
        countUp();

    //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
    },10);
}


// スタートボタンがクリックされたら時間を進める
startBtn.addEventListener('click', () => {
startBtn.disabled = true;
stopBtn.disabled = false;
resetBtn.disabled = true;
totalBtn.disabled = true;
startTime();
//displayTime();
});


// ストップボタンがクリックされたら時間を止める
stopBtn.addEventListener('click', function() {
startBtn.disabled = true;
stopBtn.disabled = true;
resetBtn.disabled = false;
totalBtn.disabled = false;
clearInterval(timeoutID);

});

// リセットボタンがクリックされたら時間を0に戻す
resetBtn.addEventListener('click', function() {
startBtn.disabled = false;
stopBtn.disabled = true;
resetBtn.disabled = true;
totalBtn.disabled = true;
time = 0;
document.form_sw.count.value =  '00.00'; 

});


// コンティニューボタンがクリックされたら、次のテストへいく
totalBtn.addEventListener('click', function () {
    window.location.href = 'totalscore.html'
}); */