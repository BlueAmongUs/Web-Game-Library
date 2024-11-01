export class UI {
    /**
     * 
     * @param {HTMLDivElement} div_el 
     */
    constructor(div_el) {
        this.div_el = div_el;
    }

    appear() {
        this.div_el.style.display = "block";
    }
    
    disappear() {
        this.div_el.style.display = "none";
    }
}