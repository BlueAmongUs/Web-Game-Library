import { rad } from "../../src/misc/convert.js";
import { graphics, geometry, core, controls } from "../../src/webgamelib.js";

const { InputKey } = controls;
const { Instance } = core;
const { Vector2 } = geometry;
const { Animator, Renderer } = graphics;

/**@type {HTMLInputElement} */
const toggleanim = document.getElementById("toggleanim");

/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const renderer = Renderer.new(ctx);
const animator = Animator.new(renderer, onAnimate);

window.ctx = ctx;
window.renderer = renderer;
window.animator = animator;

const square = new Instance(
    renderer, 
    Vector2.new(25, 25), Vector2.new(25, 25), 
    (_, size, pos) => {
        renderer.rect(
            pos.add(size.polarize()),
            pos.add(size),
        );
        const text = Math.round(pos.x).toString()
        renderer.text(
            text, 
            pos.add(Vector2.new(-Math.round(text.length * 3)))
        );
    }
)
const max_square_x = canvas.width - square.size.x

const halfcanvas = Vector2.new(canvas.width / 2, canvas.height / 2)

let degree = 0;
const rotator = new Instance(
    renderer,
    Vector2.new(50, -50), halfcanvas,
    (_, size, pos) => {
        ctx.fillStyle = "#00FF00"
        renderer.circle(size.add(pos), 25, "fill");
        const text = Math.round(degree).toString()
        renderer.text(
            text, 
            size.add(pos).add(Vector2.new(-Math.round(text.length * 3)))
        )
    }
)
rotator.fixed_size = rotator.size.with();

function draw() {
    square.draw();
    rotator.draw();
    ctx.fillStyle = "#000000";
    renderer.circle(halfcanvas, Math.hypot(rotator.size.x, rotator.size.y))
}

draw();

/**@type {HTMLInputElement} */
const shootrate = document.querySelector("#shootrate")

/**
 * 
 * @param {Renderer} _renderer 
 * @param {number} time_elapsed 
 * @param {number} delta_time
 */
function onAnimate(_renderer, delta_time, time_elapsed) {
    renderer.clear();
    
    if (degree > 360) {
        degree = 0;
    }
    if (square.position.x > max_square_x) {
        square.position.x = 0;
    }

    if (Math.floor(degree) % shootrate.value === 0) {
        ctx.strokeStyle = "#FF0000"
        renderer.line(square.position, rotator.size.add(rotator.position))
    }
    ctx.strokeStyle = "#000000"
    
    square.position = square.position.add(Vector2.new(delta_time / 10, 0))
    const COS = Math.cos(rad(degree)) * rotator.fixed_size.x;
    const SIN = Math.sin(rad(degree)) * -rotator.fixed_size.y;
    rotator.size = Vector2.new(
        COS + SIN,
        SIN - COS,
    )

    degree += delta_time / 10;
    
    draw();
}

/**
 * 
 * @param {Event} ev 
 */
function onToggle({currentTarget}) {
    /**@type {{checked: boolean}} */
    const { checked } = currentTarget;
    if (checked) {
        animator.activate();
    } else {
        animator.deactivate();
    }
}

toggleanim.onchange = onToggle

/**@type {import("../../src/controls/input-key.js").InputKeyMap} */
const keydownmap = {
    f() {
        toggleanim.click();
    }
}

const inputkey = new InputKey({}, keydownmap);
inputkey.enable();
