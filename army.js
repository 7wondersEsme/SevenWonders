const {Soldier} = require('./soldier');
const {Entity} = require('./entity');

class Army extends Entity {
  constructor(name, x, y, nb, timeFactor) {
    super(name, x, y, 2, timeFactor);
    this.soldiers_ = {};
    this.nSoldiers_ = 0;
    for (let i = 0; i < nb; i++) {
      const soldier = new Soldier((++this.nSoldiers_).toString(), this.timeFactor_ * 10);
      this.soldiers_[soldier.name] = soldier;
    }

    this.allDead_ = false;
  }

  init() {
    super.init();
    for (const s in this.soldiers_) {
      this.soldiers_[s].init();
    }

    this.gaiaInterval_ = setInterval(() => {
    }, this.timeFactor_);
  }

  attack(other) {
    return new Promise(resolve => {
      setTimeout(() => {
        let selfTouches = 0;
        if (this.allDead || other.allDead) {
          resolve();
        } else {
          for (let i = 0; i < this.valids; i++) {
            if (Math.random() > 0.80) {
              selfTouches++;
            }
          }
          let otherTouches = 0;
          for (let i = 0; i < other.valids; i++) {
            if (Math.random() > 0.80) {
              otherTouches++;
            }
          }

          if (otherTouches < this.valids) {
            for (const s in this.soldiers_) {
              if (this.soldiers[s].isAlive && !this.soldiers[s].isHurt && otherTouches > 0) {
                if (Math.random() > 0.2) {
                  this.soldiers[s].hurt();
                } else {
                  this.soldiers[s].endWorld();
                  delete this.soldiers[s];
                  this.nSoldiers_--;
                  console.log('--');
                }
                otherTouches--;
              }
            }
          } else {
            this.endWorld();
          }

          if (selfTouches < other.valids) {
            for (const s in other.soldiers) {
              if (other.soldiers[s].isAlive && !other.soldiers[s].isHurt && selfTouches > 0) {
                if (Math.random() > 0.2) {
                  other.soldiers[s].hurt();
                } else {
                  other.soldiers[s].endWorld();
                  delete other.soldiers[s];
                  other.nSoldiers--;
                  console.log('--');
                }
                selfTouches--;
              }
            }
          } else {
            other.endWorld();
          }
          resolve();
        }
      }, 5 * this.timeFactor_);
    });
  }

  get count() {
    let count_ = 0;
    let length_ = 0;
    for (const s in this.soldiers_) {
      if (this.soldiers_[s].isAlive) {
        count_++;
      }
      length_++;
    }
    console.log('count/length : ' + count_ + '/' + length_ + '/' + this.nSoldiers_);
    return count_;
  }

  get valids() {
    let count_ = 0;
    for (const s in this.soldiers_) {
      if (this.soldiers_[s].isAlive && !this.soldiers_[s].isHurt) {
        count_++;
      }
    }
    return count_;
  }

  get soldiers() {
    return this.soldiers_;
  }

  get nSoldiers() {
    return this.nSoldiers_;
  }

  set nSoldiers(n) {
    this.nSoldiers_ = n;
  }

  get allDead() {
    return this.allDead_;
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  endWorld() {
    for (const s in this.soldiers_) {
      this.soldiers_[s].endWorld();
    }
    this.allDead_ = true;
    clearInterval(this.gaiaInterval_);
    super.endWorld();
  }
}

module.exports = {Army};
