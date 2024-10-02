import { Vector2, PixelData } from "../geometry/index.js";

export class Renderer {
    /**@type {CanvasRenderingContext2D} */
    ctx;
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    constructor(ctx) {
        this.ctx = ctx;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
    /**
     * 
     * @param {Vector2} vec2a 
     * @param {Vector2} vec2b 
     */
    clearArea(vec2a, vec2b) {
        const vec2range = Vector2.rangeabs(vec2a, vec2b);
        this.ctx.clearRect(vec2a.x, vec2a.y, vec2range.x, vec2range.y);
    }
    /**
     * 
     * @param {Vector2} vec2a 
     * @param {Vector2} vec2b 
     */
    line(vec2a, vec2b) {
        this.ctx.beginPath();

        this.ctx.moveTo(vec2a.x, vec2a.y);
        this.ctx.lineTo(vec2b.x, vec2b.y);
        this.ctx.stroke();

        this.ctx.closePath();
    }
    /**
     * 
     * @param {Vector2} vec2a 
     * @param {Vector2} vec2b 
     * @param {import("./type.js").DrawType} type
     */
    rect(vec2a, vec2b, type) {
        this.ctx.beginPath();
        
        const vec_range = Vector2.rangeabs(vec2a, vec2b)
        if (type === "fill") {
            this.ctx.fillRect(
                vec2a.x, vec2a.y,
                vec_range.x, vec_range.y
            );
        } else {
            this.ctx.strokeRect(
                vec2a.x, vec2a.y, 
                vec_range.x, vec_range.y
            )
        }

        this.ctx.closePath();
    };

    /**
     * 
     * @param {Vector2} pos 
     * @param {Vector2} size 
     * @param {import("./type.js").DrawType} type 
     */
    rect2(pos, size, type) {
        this.ctx.beginPath();
        
        if (type === "fill") {
            this.ctx.fillRect(
                pos.x, pos.y,
                size.x, size.y
            );
        } else {
            this.ctx.strokeRect(
                pos.x, pos.y, 
                size.x, size.y
            )
        }

        this.ctx.closePath();
    };

    /**
     * 
     * @param {Vector2} vec2
     * @param {number} radius
     * @param {import("./type.js").DrawType} draw_type 
     * @param {number} start_radian 
     * @param {number} end_radian 
     * @param {boolean} counter_clockwise 
     */
    circle(
        vec2, radius, draw_type = "stroke",
        start_radian = 0, end_radian = 2 * Math.PI, 
        counter_clockwise = false
    ) {
        this.ctx.beginPath();

        this.ctx.arc(
            vec2.x, vec2.y, 
            radius, start_radian, end_radian, 
            counter_clockwise
        );

        this.ctx[draw_type]()

        this.ctx.closePath();
    }
    
    /**
     * @ignore
     * ! IN PROGRESS : DO NOT USE
     * 
     * @param {Vector2} size 
     * @param {Vector2} position
     * @returns {PixelData}
     */
    getPixels(
        position = new Vector2(), 
        size = new Vector2(
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
    ) {
        const image_data = this.ctx.getImageData(
            position.x, position.y,
            size.x, size.y
        );
        return PixelData.fromImageData(image_data);
    }

    /**
     * @ignore
     * ! IN PROGRESS : DO NOT USE
     * 
     * @param {PixelData} pixeldata
     * @param {Vector2} position  
     */
    setPixels(pixeldata, position = new Vector2()) {
        this.ctx.putImageData(pixeldata.toImageData(), position.x, position.y);
    }

    /**
     * 
     * @param {string} text 
     * @param {Vector2} pos 
     * @param {import("./type.js").DrawType} drawtype 
     * @param {number?} max_width 
     */
    text(text, pos = new Vector2(), drawtype = "stroke", max_width) {
        this.ctx[`${drawtype}Text`](text, pos.x, pos.y, max_width);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    static new(ctx) {
        return new Renderer(ctx);
    }
}