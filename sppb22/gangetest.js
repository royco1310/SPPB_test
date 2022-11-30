
let url = new URL(window.location.href);
let params = url.searchParams;
let points = params.get('points')


console.log(points, 'point from samletefottenetest');


const timer = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const nextTestBtn = document.getElementById('nexttest');
const score4 = document.getElementById("td-4");
const gange1 = document.getElementById("gange1");
const gange2 = document.getElementById("gange2");

startBtn.disabled = false;
stopBtn.disabled = true;
resetBtn.disabled = true;
nextTestBtn.disabled = true;

let startTime;
let elapsedTime = 0;
let timerId;
let timeToadd = 0;
let flgg = 0;
let pointga1 = 0;
let pointga2 = 0;
let bestscore = 0;
let besttime = 0;


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
    let s = Math.floor(elapsedTime % 70000 / 1000);
    let ms = elapsedTime % 1000;
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-2);
    timer.textContent = s + '.' + ms;
    if (flgg == 0) {
        flgg = 1;
        startBtn.disabled = true;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
        nextTestBtn.disabled = false;
        clearInterval(timerId);
        gange1.textContent = timer.textContent;
        console.log(gange1);
        //getScore();
        if (timer.textContent < 4.82) {
            pointga1 = 4;
            console.log(pointga1, 'point');
        } else if (timer.textContent < 6.20) {
            pointga1 = 3;
            console.log(pointga1, 'point');
        } else if (timer.textContent < 8.70) {
            pointga1 = 2;
            console.log(pointga1, 'point');
        } else if (timer.textContent > 8.71) {
            pointga1 = 1;
            console.log(pointga1, 'point');
        } else {
            pointga1 = 0;
            console.log(pointga1, 'point');
        };
    
    } else if (flgg == 1) {
        flgg = 2;
        startBtn.disabled = true;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
        nextTestBtn.disabled = false;
        clearInterval(timerId);
        gange2.textContent = timer.textContent;
        console.log(gange2);
        //getScore();
        if (timer.textContent < 4.82) {
            pointga2 = 4;
            console.log(pointga2, 'point');
        } else if (timer.textContent < 6.20) {
            pointga2 = 3;
            console.log(pointga2, 'point');
        } else if (timer.textContent < 8.70) {
            pointga2 = 2;
            console.log(pointga2, 'point');
        } else if (timer.textContent > 8.71) {
            pointga2 = 1;
            console.log(pointga2, 'point');
        } else {
            pointga2 = 0;
            console.log(pointga2, 'point');
        };
        getBestScore();
};

       
    });
    function getBestScore () {
        bestscore = Math.max(pointga1, pointga2);
        score4.textContent = bestscore;
        console.log(bestscore, 'is your best score in gangetest');
        besttime = Math.min(gange1.textContent, gange2.textContent);
        console.log(besttime);
    };


/*function getScore (){
    let s = Math.floor(elapsedTime % 70000 / 1000);
    let ms = elapsedTime % 1000;
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-2);
    timer.textContent = s + '.' + ms;
    if (timer.textContent < 4.82) {
        pointga = 4;
        console.log(pointga, 'point');
    } else if (timer.textContent < 6.20) {
        pointga = 3;
        console.log(pointga, 'point');
    } else if (timer.textContent < 8.70) {
        pointga = 2;
        console.log(pointga, 'point');
    } else if (timer.textContent > 8.71) {
        pointga = 1;
        console.log(pointga, 'point');
    } else {
        pointga = 0;
        console.log(pointga, 'point');
    };

};

*/



resetBtn.addEventListener('click',function(){

    if (flgg == 1) {
        flgg = 0;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
        nextTestBtn.disabled = true;
        gange1.textContent = '00.00'
        elapsedTime = 0;
        timeToadd = 0;
        updateTimetText();

    } else if (flgg == 2) {
        flgg = 1;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
        nextTestBtn.disabled = true;
        elapsedTime = 0;
        timeToadd = 0;
        updateTimetText();
        gange2.textContent = '00.00'
        score4.textContent = '0';
    };


});


nextTestBtn.addEventListener('click', function () {
    if (flgg == 1) {
        console.log('Next-----------');
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
        nextTestBtn.disabled = true;
        elapsedTime = 0;
        timeToadd = 0;
        updateTimetText();
    } else if (flgg == 2){
        let pointg = +points + +bestscore;
        window.location.href = 'reisesettetest.html?pointg=' + pointg + '&besttime=' + besttime;
    };
});

