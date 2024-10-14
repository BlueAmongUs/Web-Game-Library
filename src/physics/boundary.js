import { Instance } from "../core/instance.js";
import { Vector2 } from "../geometry/vector2.js";
import { Collisions } from "./collisions.js"

export class Boundary {
    /**
     * @param {Collisions} collision 
     */
    constructor(collision) {
        this.collision = collision;
    }
    /**
     * Check and adjust the instance's position based on
     * its collisions being set as boundaries
     * 
     * @returns {void}
     */
    checkAndAdjust() {
        const instances = this.collision.checkCollisions();
        const {instance} = this.collision;
        if (instances.length === 0) return;

    }

    /**
     * 
     * @param {Instance} instance
     * @param {Instance} boundary_instance 
     * @param {Vector2} hitdirection 
     */
    static checkAndAdjustOne(
        instance,
        boundary_instance, 
        hitdirection
    ) {
        const collided = Collisions.checkSingleCollision(
            instance, 
            boundary_instance
        )
        if (!collided) return;
        if (hitdirection.x === 0 && hitdirection.y === 0) return;
        const polarized_dir = hitdirection.polarize()
        
        const setpos = boundary_instance.position
            .add(instance.size.multiplyvec2(polarized_dir))
            .add(polarized_dir.multiply(3));
        let diraxe = "x";
        if (hitdirection.y === 1 && hitdirection.x === 0) {
            diraxe = "y";
        };
        instance.position[diraxe] = setpos[diraxe];
    }   
}