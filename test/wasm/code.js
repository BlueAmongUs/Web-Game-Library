import { add, mulU  } from "./build/release.js";

const result = document.querySelector("#result");

let a = add(1, 2);
let b = mulU(4, 4);

console.log(a);

result.textContent = a + " " + b;