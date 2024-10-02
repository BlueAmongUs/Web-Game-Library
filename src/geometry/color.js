export class Color3 {
    /**
     * 
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     */
    constructor(r,g,b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    /**
     * 
     * @param {Color4} color4
     * @param {boolean} div_alpha
     */
    static fromColor4(color4, div_alpha = false) {
        const color3 = new Color3(color4.r, color4.g, color4.b);
        if (div_alpha === true) {
            color3.r /= a;
            color3.g /= a;
            color3.b /= a;
        };
        return color3;
    }

    /**
     * 
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     */
    static new(r, g, b) {
        return new Color3(r, g, b); 
    }
}

export class Color4 {
    /**
     * 
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     * @param {number} a Alpha
     */
    constructor(r,g,b,a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * 
     * @param {Color3} color3 
     */
    static fromColor3(color3) {
        return new Color4(color3.r, color3.g, color3.b, 1);
    }
    /**
     * 
     * @param {number} r Red
     * @param {number} g Green
     * @param {number} b Blue
     * @param {number} a Alpha
     */
    static new(r,g,b,a) {
        return new Color4(r,g,b,a);
    }
}