import {Color3, Color4} from "./color.js"

export class PixelData {
    /**
     * 
     * @param {Color4[]} data 
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * @returns {ImageData}
     */
    toImageData() {
        const image_data = new ImageData();
        image_data.data = new Uint8ClampedArray();
        return image_data;
    }
    /**
     * 
     * @param {Color4[]} data 
     */
    static new(data) {
        return new PixelData(data);
    }
    
    /**
     * 
     * @param {ImageData} imagedata 
     */
    static fromImageData(imagedata) {

    }

    /**
     * @param {Color3[]} color3array 
     */
    static fromColor3Array(color3array) {
        
    }
}