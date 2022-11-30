const p = document.getElementById('point');

let url = new URL(window.location.href);
let params = url.searchParams;
let point = params.get('point');

console.log(point);
p.textContent = point;



/*import { yourPoint } from "./score1";
console.log(yourPoint);

const p = document.getElementById('point');

function totalScore () {
    console.log(p);
    p.textContent = p;
};*/