const EventEmitter = require('events');

class Entity {
  constructor(name, x, y, speed, timeFactor) {
    this.name_ = name || 'UNKENTITY';
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 100;
    this.x_ = x;
    this.y_ = y;
    this.dx_ = x;
    this.dy_ = y;
    this.speed_ = speed;
    this.onDest_ = true;
  }

  init() {
    this.gaiaEntInterval_ = setInterval(() => {
      const dist = Math.sqrt(Math.pow((this.x_ - this.dx_), 2) + Math.pow((this.y_ - this.dy_), 2));
      if (!this.onDest_) {
        const prevX = this.x_;
        const prevY = this.y_;
        if (dist > this.speed_) {
          this.x_ += this.speed_ * (this.dx_ - this.x_) / dist;
          this.y_ += this.speed_ * (this.dy_ - this.y_) / dist;
        } else {
          this.x_ = this.dx_;
          this.y_ = this.dy_;
          this.onDest_ = true;
        }
        this.worldEvents_.emit('move', {x: prevX, y: prevY});
      }
    }, this.timeFactor_);
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  moveTo(dx, dy) {
    this.dx_ = dx;
    this.dy_ = dy;
    this.onDest_ = false;
  }

  get x() {
    return this.x_;
  }

  get y() {
    return this.y_;
  }

  get dx() {
    return this.dx_;
  }

  get dy() {
    return this.dy_;
  }

  get onDest() {
    return this.onDest_;
  }

  get name() {
    return this.name_;
  }

  endWorld() {
    clearInterval(this.gaiaEntInterval_);
  }
}

module.exports = {Entity};
