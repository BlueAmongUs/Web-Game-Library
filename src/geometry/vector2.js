export class Vector2 {
    /**@type {number} */
    x; 
    /**@type {number} */
    y;

    /**
     * 
     * @param {number?} x 
     * @param {number?} y 
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /**
     * 
     * @param {Vector2} vec2 
     * @returns {Vector2}
     */
    add(vec2) {
        return new Vector2(
            this.x + vec2.x,
            this.y + vec2.y
        );
    };
    /**
     * 
     * @param {number} scalar 
     * @returns {Vector2}
     */
    multiply(scalar) {
        return new Vector2(
            this.x * scalar,
            this.y * scalar
        )
    }
    /**
     * 
     * @param {Vector2} vec2 
     * @returns {Vector2}
     */
    multiplyvec2(vec2) {
        return new Vector2(
            this.x * vec2.x,
            this.y * vec2.y
        )
    }

    /**
     * @returns {Vector2}
     */
    abs() {
        return new Vector2(
            Math.abs(this.x),
            Math.abs(this.y)
        )
    }

    /**
     * Flip Vector2's number
     * 
     * @returns {Vector2}
     */
    polarize() {
        return this.multiply(-1);
    }

    /**
     * 
     * @returns {number}
     */
    magnitude() {
        return Math.hypot(this.x, this.y);
    }

    /**
     * @returns {Vector2}
     */
    unit() {
        return this.multiply(1 / this.magnitude())
    }

    /**
     * 
     * @param {{x: number?, y: number?}} newxy 
     * @returns {Vector2}
     */
    with(newxy) {
        return new Vector2(
            newxy?.x ?? this.x,
            newxy?.y ?? this.y
        )
    }

    /**
     * 
     * @returns {Vector2}
     */
    static one() {
        return new Vector2(1, 1);
    }

    /**
     * 
     * @param {number} num
     * @returns {Vector2}
     */
    static both(num) {
        return new Vector2(num, num)
    }

    /**
     * 
     * @param {Vector2} vec2a 
     * @param {Vector2} vec2b 
     * @returns {Vector2}
     */
    static rangeabs(vec2a, vec2b) {
        return this.range(vec2a, vec2b).abs();
    }

    /**
     * 
     * @param {Vector2} vec2a 
     * @param {Vector2} vec2b 
     * @returns {Vector2}
     */
    static range(vec2a, vec2b) {
        return new Vector2(
            vec2a.x - vec2b.x,
            vec2a.y - vec2b.y,
        )
    }

    /**
     * 
     * @param {Vector2} vec2a 
     * @param {Vector2} vec2b 
     * @returns {Vector2}
     */
    static rand(vec2a, vec2b) {
        const rand1 = new Vector2(
            Math.random(), Math.random()
        );
        const rangeabs = this.rangeabs(vec2a, vec2b);
        return rand1.multiplyvec2(rangeabs).add(vec2a);
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    static new(x, y) {
        return new Vector2(x,y);
    }
}
