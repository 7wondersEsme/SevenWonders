const EventEmitter = require('events');

class Player {
  constructor(name, timeFactor) {
    this.name_ = name;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
		this.entities_ = {};
		this.gold_ = 100;
		this.corn_ = 100;
		this.fieldLevel_ = 1;
		this.marketLevel_ = 1;
  }

  init() {
    this.gaiaEntInterval_ = setInterval(() => {
			this.gold_ += this.fieldLevel_;
			this.corn_ += this.marketLevel_;
    }, this.timeFactor_);
  }

	upgradeField() {
		if(this.gold_ >= this.fieldLevel_*100) {
			this.gold_ -= this.fieldLevel_*100;
			this.fieldLevel_ *= 1.3;
		}
	}

  get worldEvents() {
    return this.worldEvents_;
  }

	get name() {
		return this.name_;
	}

	get corn() {
		return this.corn_;
	}

	get gold() {
		return this.gold_;
	}

	get entities() {
		return this.entities_;
	}

  endWorld() {
    clearInterval(this.gaiaEntInterval_);
  }
}

module.exports = {Player};
