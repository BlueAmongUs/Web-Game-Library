import { Renderer } from "./renderer.js";

export class Animator {
    /**@type {Renderer} */
    renderer;
    /**@type {import("./type.js").OnAnimateType} */
    onAnimate;
    /**DO NOT CHANGE */
    _current_handle = 0;
    /**DO NOT CHANGE, use .activate(), .deactivate() instead! */
    _activated = false;
    _last_time_elapsed = 0;
    /**
     * 
     * @param {Renderer} renderer 
     * @param {import("./type.js").OnAnimateType} onAnimate
     */
    constructor(renderer, onAnimate) {
        this.renderer = renderer;
        this.onAnimate = onAnimate;
    }

    /**
     * @param {Animator} animator
     * @param {number} time 
     */
    static _initialize_handle(animator, time) {
        if (animator._activated === false) return;
        animator.renderer.clear();
        animator.onAnimate(
            animator.renderer, 
            time - animator._last_time_elapsed,
            time, 
        );
        animator._current_handle = window.requestAnimationFrame(
            time => {
                Animator._initialize_handle(animator, time)
            }
        );
        animator._last_time_elapsed = time;
    }
    activate() {
        this._activated = true;
        this._current_handle = window.requestAnimationFrame(
            time => {
                this._last_time_elapsed = time;
                Animator._initialize_handle(this, time);
            }
        );
    }
    deactivate() {
        this._activated = false;
        window.cancelAnimationFrame(this._current_handle);
    }
    /**
     * 
     * @param {Renderer} renderer 
     * @param {import("./type.js").OnAnimateType} onAnimate
     */
    static new(renderer, onAnimate) {
        return new Animator(renderer, onAnimate);
    }
}