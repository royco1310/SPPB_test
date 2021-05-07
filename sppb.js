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

function stop2() {
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


//semi tandem

function run() { 
    time = 0; 
    tm = setInterval("disp()",10);
} 
function stop() { 
    clearInterval(tm); 
} 
function disp() { //時間表示 
    ++time;

    min = Math.floor(time / 6000); 
    min10 = Math.floor(min / 10); //分の10の位 
    min1 = min % 10; //分の1の位 

    sec = Math.floor(time % 6000 / 100); //秒 
    sec10 = Math.floor(sec / 10); //秒の10の位     
    sec1 = sec % 10; //秒の1の位 
    
    mSec = time % 100; //ミリ秒 
    mSec10 = Math.floor(mSec / 10) //ミリ秒の10の位 
    mSec1 = mSec % 10; //ミリ秒の1の位 

    document.form_sw.count.value =  '' + min10 + min1 + ":" + sec10 + sec1 + ":" + mSec10 + mSec1; 
} 


//tandem

var start_time;
var stop_time;
var time;

function startTimer() {
  start_time = Date.now();
}

function stopTimer() {
  stop_time = Date.now();
  time = stop_time - start_time;
  time = time / 1000;
  document.getElementById('output').innerHTML = time + '秒';
}

function resetTimer() {
  document.getElementById('output').innerHTML = '';
}


//4 m gangtest
(function(){
    'use strict';

    //htmlのidからデータを取得
    //取得したデータを変数に代入

    var timer = document.getElementById('timering');
    var start = document.getElementById('starting');
    var stop = document.getElementById('stopping');
    var reset = document.getElementById('resetting');

    //クリック時の時間を保持するための変数定義
    var startTime;

    //経過時刻を更新するための変数。 初めはだから0で初期化
    var elapsedTime = 0;

    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    var timerId;

    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    var timeToadd = 0;


    //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
    //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
    function updateTimetText(){

        //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
        var m = Math.floor(elapsedTime / 60000);

        //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
        var s = Math.floor(elapsedTime % 60000 / 1000);

        //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
        var ms = elapsedTime % 1000;


        //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
        //javascriptでは文字列数列を連結すると文字列になる
        //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
        m = ('0' + m).slice(-2); 
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-3);

        //HTMLのid　timer部分に表示させる　
        timer.textContent = m + ':' + s + ':' + ms;
    }


    //再帰的に使える用の関数
    function countUp(){

        //timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function(){

            //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()

            //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
            countUp();

        //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
        },10);
    }

    //startボタンにクリック時のイベントを追加(タイマースタートイベント)
    start.addEventListener('click',function(){

        //在時刻を示すDate.nowを代入
        startTime = Date.now();

        //再帰的に使えるように関数を作る
        countUp();
    });

    //stopボタンにクリック時のイベントを追加(タイマーストップイベント)
    stop.addEventListener('click',function(){

        //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
       clearTimeout(timerId);


        //タイマーに表示される時間elapsedTimeが現在時刻かたスタートボタンを押した時刻を引いたものなので、
        //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
        //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
       timeToadd += Date.now() - startTime;
    });

    //resetボタンにクリック時のイベントを追加(タイマーリセットイベント)
    reset.addEventListener('click',function(){

        //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
        elapsedTime = 0;

        //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
        timeToadd = 0;

        //updateTimetTextで0になったタイムを表示
        updateTimetText();

    });
})();

//reise sette seg
(function(){
    'use strict';

    //htmlのidからデータを取得
    //取得したデータを変数に代入

    var timer = document.getElementById('tid');
    var start = document.getElementById('kjør');
    var stop = document.getElementById('stop!');
    var reset = document.getElementById('engangTil');

    //クリック時の時間を保持するための変数定義
    var startTime;

    //経過時刻を更新するための変数。 初めはだから0で初期化
    var elapsedTime = 0;

    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    var timerId;

    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    var timeToadd = 0;


    //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
    //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
    function updateTimetText(){

        //m(分) = 135200 / 60000ミリ秒で割った数の商　-> 2分
        var m = Math.floor(elapsedTime / 60000);

        //s(秒) = 135200 % 60000ミリ秒で / 1000 (ミリ秒なので1000で割ってやる) -> 15秒
        var s = Math.floor(elapsedTime % 60000 / 1000);

        //ms(ミリ秒) = 135200ミリ秒を % 1000ミリ秒で割った数の余り
        var ms = elapsedTime % 1000;


        //HTML 上で表示の際の桁数を固定する　例）3 => 03　、 12 -> 012
        //javascriptでは文字列数列を連結すると文字列になる
        //文字列の末尾2桁を表示したいのでsliceで負の値(-2)引数で渡してやる。
        m = ('0' + m).slice(-2); 
        s = ('0' + s).slice(-2);
        ms = ('0' + ms).slice(-3);

        //HTMLのid　timer部分に表示させる　
        timer.textContent = m + ':' + s + ':' + ms;
    }


    //再帰的に使える用の関数
    function countUp(){

        //timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function(){

            //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()

            //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
            countUp();

        //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
        },10);
    }

    //startボタンにクリック時のイベントを追加(タイマースタートイベント)
    start.addEventListener('click',function(){

        //在時刻を示すDate.nowを代入
        startTime = Date.now();

        //再帰的に使えるように関数を作る
        countUp();
    });

    //stopボタンにクリック時のイベントを追加(タイマーストップイベント)
    stop.addEventListener('click',function(){

        //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
       clearTimeout(timerId);


        //タイマーに表示される時間elapsedTimeが現在時刻かたスタートボタンを押した時刻を引いたものなので、
        //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
        //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
       timeToadd += Date.now() - startTime;
    });

    //resetボタンにクリック時のイベントを追加(タイマーリセットイベント)
    reset.addEventListener('click',function(){

        //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
        elapsedTime = 0;

        //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
        timeToadd = 0;

        //updateTimetTextで0になったタイムを表示
        updateTimetText();

    });
})();
