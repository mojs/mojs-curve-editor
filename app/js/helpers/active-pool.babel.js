class ActivePool {
  constructor () {
    this._subscribers = [];
  }

  add (fn) { this._subscribers.push(fn); }

  resetActive (name) {
    for (let i = 0; i < this._subscribers.length; i++) {
      this._subscribers[i](name);
    }
  }
}

export default ActivePool;