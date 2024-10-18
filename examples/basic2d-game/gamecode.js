import { InputKey } from "../../src/controls/input-key.js";
import { Instance } from "../../src/core/instance.js";
import { Vector2 } from "../../src/geometry/vector2.js";
import { Animator } from "../../src/graphics/animator.js";
import { Boundary } from "../../src/physics/boundary.js";
import { Collisions } from "../../src/physics/collisions.js";
import { graphics, physics } from "../../src/webgamelib.js";

const { Renderer } = graphics;

/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
const renderer = new Renderer(ctx);
const animator = new Animator(renderer, onAnimate);

const halfcanvas = Vector2.new(
    canvas.width / 2,
    canvas.height / 2
)

const drawrect = (_, s, p) => {
    renderer.rect2(p, s, "fill")
}

const instance1 = new Instance(
    renderer,
    Vector2.new(25, 25), halfcanvas,
    drawrect
);

const instance2 = new Instance(
    renderer,
    Vector2.new(50, canvas.width),
    Vector2.new(25, canvas.height),
    drawrect
);

const instance3 = new Instance(
    renderer,
    Vector2.new(25, 25), Vector2.new(12.5, 12.5),
    drawrect
);

const dangerous_object = new Instance(
    renderer,
    Vector2.new(25, 25), Vector2.new(50, 50),
    drawrect
)

function draw() {
    ctx.fillStyle = "#555555"
    instance1.draw();
    ctx.fillStyle = "#000000"
    instance2.draw();
    ctx.fillStyle = "#FF0000";
    dangerous_object.draw();
}


draw();
ctx.fillStyle = "#00FF00"
instance3.draw();

let direction = new Vector2();
function onAnimate(_, delta_time) {
    Boundary.checkAndAdjustOne(instance3, instance1, direction);
    draw();
    instance3.position = instance3.position.add(direction.multiply(delta_time / 10));
    if (Collisions.checkSingleCollision(instance3, dangerous_object)) {
        ctx.fillStyle = "#00FF00"
    } else {
        ctx.fillStyle = "#000000"
    }
    instance3.draw();
}

animator.activate()


const inputkey = new InputKey({
    w() { direction.y = 0 },
    a() { direction.x = 0 },
    s() { this.w() },
    d() { this.a() },
}, {
    w() {
        direction.y = -1
    },
    a() {
        direction.x = -1
    },
    s() {
        direction.y = 1
    },
    d() {
        direction.x = 1
    }
})

inputkey.enable();