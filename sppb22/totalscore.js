const p = document.getElementById('dittpoeng');
const g = document.getElementById('dittganghastighet');

let url = new URL(window.location.href);
let params = url.searchParams;
let sum = params.get('sum');
let besttime = params.get('besttime');
let y = 0;

console.log('your totalscore is', sum, 'point');
p.textContent = sum;

console.log('your ganghastighet is', besttime, '.');
y = 4 / besttime;
console.log(y);
const ggg = Math.ceil(y * Math.pow(10, 2) ) / Math.pow(10, 2);
console.log(ggg);
g.textContent = ggg;


/*const ttlScr = document.getElementById('dittpoeng');

ttlScr.textContent = 'hei';


function totalscore () {
    console.log (score1 + score2 + score3 + score4 + score5);
}*/


