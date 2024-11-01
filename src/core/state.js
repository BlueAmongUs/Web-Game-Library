export class State {
    _current_state;
    /**
     * 
     * @param {string[]} states 
     * @param {string?} current_state 
     */
    constructor(states, current_state) {
      this.states = states;
      this._current_state = current_state;
    }
    /**
     * @param {string} new_state
     * @returns {string} old state
    */
    set set(new_state) {
      let old_state = this._current_state
      this._current_state = new_state;
      return old_state;
    }
    get get() { return this._current_state };
}