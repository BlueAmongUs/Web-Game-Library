import { Vector2 } from "../geometry/index.js";
import { Renderer } from "../graphics/renderer.js";

export class Instance {
    /**
     * 
     * @param {Renderer} renderer
     * @param {Vector2} size 
     * @param {Vector2} position 
     * @param {import("./types.js").InstanceDrawFunction} draw_func
     */
    constructor(renderer, size, position, draw_func) {
        this.renderer = renderer;
        this.size = size;
        this.position = position;
        this.draw_func = draw_func;
    }

    draw() {
        this.draw_func(this.renderer, this.size, this.position);
    }
}