const {Entity} = require('./entity');

class Trader extends Entity {
  constructor(name, x, y, timeFactor) {
    super(name, x, y, 1, timeFactor);
    this.given_ = 0;
    this.taken_ = 0;
    this.type_ = 'gold';
  }

  init() {
    super.init();
  }

  give(amount, type) {
    this.type_ = type;
    this.taken_ = amount;
  }

  trade() {
    return new Promise((resolve, reject) => {
    //  If(this.taken_ !== 0) {
      setTimeout(() => {
        if (this.taken_ === 0) {
          reject(new Error('Trade already done'));
        } else {
          this.given_ = Math.floor(this.taken_ * 1.1);
          this.taken_ = 0;
          resolve();
        }
      }, this.timeFactor * 10);
    });
  }

  kill() {
    this.taken_ = 0;
    this.given_ = 0;
    super.endWorld();
  }

  get given() {
    return this.given_;
  }

  get taken() {
    return this.taken_;
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  endWorld() {
    super.endWorld();
  }
}

module.exports = {Trader};
