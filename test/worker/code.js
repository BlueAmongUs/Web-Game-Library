const result = document.getElementById("result");
const compute = document.getElementById("compute");

const add_btn = document.getElementById("add_btn");
const compute_btn = document.getElementById("compute_btn");

const worker = new Worker(
    new URL("worker.js", location.href),
    {
        name: "Worker",
        type: "module"
    }
);

add_btn.onclick = () => {
    result.textContent = parseInt(result.textContent) + 1;
}

compute_btn.onclick = () => {
    worker.postMessage("Hello world!");
}

/**
 * 
 * @param {MessageEvent} a 
 */
worker.onerror = (a) => {
    console.log(a);
}

/**
 * 
 * @param {MessageEvent} a 
 */
worker.onmessageerror = (a) => {
    console.log(a);
}

/**
 * 
 * @param {MessageEvent} a 
 */
worker.onmessage = (a) => {
    console.log(a);
}