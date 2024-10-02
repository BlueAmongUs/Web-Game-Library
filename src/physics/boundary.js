import { Instance } from "../core/index.js";

export class Boundary {
    /**
     * 
     * @param {Instance} instance 
     * @param {Instance} instance_boundary 
     */
    constructor(instance, instance_boundary) {
        this.instance = instance;
        this.instance_boundary = instance_boundary;
    }
    activate() {

    };
    deactivate() {

    };
}