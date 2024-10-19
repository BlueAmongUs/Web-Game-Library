import { add, mulU } from "./build/debug.js";


const debug = document.querySelector("#debug")

let d = add(1, 2);
let b = mulU(4, 6);

console.log(d);

debug.textContent = d + " " + b;
