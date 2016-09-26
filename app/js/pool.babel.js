class Pool {
  constructor () {
    this._states = [];
  }
  push (states) {
    // this._states.push(states);
    // console.log(this._states.length);
    return this;
  }

  clear () {
    this._states = [];
    return this;
  }
}


export default new Pool;