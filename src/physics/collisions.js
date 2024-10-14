import { Instance } from "../core/instance.js";

export class Collisions {
    /**
     * 
     * @param {Instance} instance 
     * @param {Instance[]} instances 
     */
    constructor(instance, instances) {
        this.instance = instance;
        this.instances = instances;
    }
    /**
     * 
     * @param {Instance} instance 
     * @param {Instance} instance2 
     * @returns {boolean}
     */
    static checkSingleCollision(instance, instance2) {
        /**
         * ! (0,0) begins in Top Left corner
         * t: top, b: bottom
         * l: left, r: right
         */
        const {position: p1, size: s1} = instance
        const {position: p2, size: s2} = instance2;

        const a = p1.x < p2.x + s1.x;

        const b = p1.x + s1.x > p2.x;
        // const b = p2.x < p1.x + s1.x;
        
        const c = p1.y < p2.y + s2.y
        
        const d = p1.y + s1.y > p2.y
        // const d = p2.y < p1.y + s1.y;

        return a && b && c && d;
    }
    /**
     * 
     * @returns {Instance[]}
     */
    checkCollisions() {
        const collided_instances = [];
        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i];
            if (Collisions.checkSingleCollision(this.instance, instance)) {
                collided_instances.push(instance);
            }
        }
        return collided_instances;
    }
    /**
     * 
     * @param {Instance[]} instances 
     * @returns {Instance[]}
     */
    checkCollisionsFor(instances) {
        const collided_instances = [];
        for (let i = 0; i < instances.length; i++) {
            const instance = instances[i];
            if (Collisions.checkSingleCollision(this.instance, instance)) {
                collided_instances.push(instance);
            }
        }
        return collided_instances;
    }
    /**
     * 
     * @param {Instance} collider 
     * @param {Instance[]} collisions 
     * @returns {Instance[]}
     */
    static checkCollisionsWith(collider, collisions) {
        const collided_instances = [];
        for (let i = 0; i < collisions.length; i++) {
            const instance = collisions[i];
            if (Collisions.checkSingleCollision(collider, instance)) {
                collided_instances.push(instance);
            }
        }
        return collided_instances;
    }
}
/**
 * ! A creator's check collision algorithm
 * ! CAUTION: Use only for testing
 * ? The official working one is 
 * ```js
 *  Collisions.checkSingleCollision(instance1, instance2)
 * ```
 * 
 * @param {Instance} instance 
 * @param {Instance} instance2 
 * @returns {boolean}
*/
export function checkOneCollisionAlpha(instance, instance2) {
    /**
         * ! (0,0) begins in Top Left corner
         * t: top, b: bottom
         * l: left, r: right
         */
        const {position: p1, size: s1} = instance
        const {position: p2, size: s2} = instance2;

        /**
         *  ^
         * | T
         * O
         * | B
         *  v
         */

        // Top
        const t1 = p1.y + s1.y;
        const b2 = p2.y - s2.y;
        const top = t1 < b2; // t1 >= b2(in default way)
        // ! (0,0) begins in Top Left corner
        
        // Bottom
        const b1 = p1.y - s1.y;
        const t2 = p2.y + s2.y;
        const bottom = b1 > t2 // b1 <= t2(in default way)
        // ! (0,0) begins in Top Left corner

        const vertical_collided = top && bottom
        
        // >--O--<
        // L    R

        // Left
        const l1 = p1.x - s1.x;
        const r2 = p2.x + s2.y;
        const left = l1 > r2;
        
        // Right
        
        const r1 = p1.x + s1.x;
        const l2 = p2.x - s2.y;
        const right = r1 > l2

        const horizontal_collided = left && right

        return vertical_collided || horizontal_collided;
}