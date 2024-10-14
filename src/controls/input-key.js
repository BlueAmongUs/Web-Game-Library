export class InputKey {
    /**
     * ! MUST BE IN LOWERCASE
     * 
     * @param {import("./types/input-key.js").InputKeyMap} keyupmap 
     * @param {import("./types/input-key.js").InputKeyMap} keydownmap 
     */
    constructor(keyupmap, keydownmap) {
        this.keyupmap = keyupmap;
        this.keydownmap = keydownmap;
    }

    /**
     * 
     * @param {"up" | "down"} type
     * @param {import("./types/input-key.js").InputKeyStr} key 
     */
    remove(type, key) {
        delete this[`key${type}map`][key];
    }
    /**
     * 
     * @param {"up" | "down"} type 
     * @param {import("./types/input-key.js").InputKeyStr} key 
     * @param {(key: string)} func 
     */
    set(type, key, func) {
        this[`key${type}map`][key] = func;
    }
    enable() {
        onkeydown = ({key}) => {
            if (!this.keydownmap) return;
            if (Object.keys(this.keydownmap).includes(key.toLowerCase())) {
                this.keydownmap[key.toLowerCase()](key)
            }
        }
        onkeyup = ({key}) => {
            if (!this.keyupmap) return;
            if (Object.keys(this.keyupmap).includes(key.toLowerCase())) {
                this.keyupmap[key.toLowerCase()](key)
            }
        }
    }
    disable() {
        onkeydown = undefined;
        onkeyup = undefined;
    }
}