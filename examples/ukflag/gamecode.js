import { geometry, graphics } from "../../src/webgamelib.js";

const { Vector2 } = geometry;
const { Renderer } = graphics;

/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const renderer = new Renderer(ctx);

window.ctx = ctx;
window.renderer = renderer;
window.Vector2 = Vector2;

const halfcanvas = new Vector2(
    canvas.width / 2, 
    canvas.height / 2
)

const veca = new Vector2(); // 0, 0
const vecb = Vector2.new(
    halfcanvas.x, halfcanvas.y / 2
);

function drawLines() {
    renderer.line(veca, halfcanvas);

    renderer.line(veca.with({y: halfcanvas.y}), halfcanvas.with({y: 0}));

    renderer.line(veca.with({y: halfcanvas.y / 2}), vecb);

    renderer.line(veca.with({x: halfcanvas.x / 2}), new Vector2(
        halfcanvas.x / 2, halfcanvas.y
    ))
}

ctx.save();

// UK Flag
ctx.fillStyle = "#0000EE"
renderer.rect(veca, halfcanvas, "fill");

ctx.strokeStyle = "#FFFFFF";
ctx.lineWidth = 10;

drawLines();

ctx.strokeStyle = "#FF0000";
ctx.lineWidth = 4;

drawLines();

ctx.strokeStyle = "#000000";
ctx.lineWidth = 10;
renderer.line(veca, veca.with({y: canvas.height}))

ctx.restore();