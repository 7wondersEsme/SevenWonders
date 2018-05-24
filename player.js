const EventEmitter = require('events');
const {Trader} = require('./trader');
const {Army} = require('./army');

class Player {
  constructor(name, x, y, timeFactor) {
    this.name_ = name;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
		this.entities_ = {};
		this.cityX_ = x;
		this.cityY_ = y;
		this.nEntities_ = 0;
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
			return true;
		}
		return false;
	}

	upgradeMarket() {
		if(this.gold_ >= this.marketLevel_*100) {
			this.gold_ -= this.marketLevel_*100;
			this.marketLevel_ *= 1.3;
			return true;
		}
		return false;
	}

	createTrader() {
		if(this.gold_ >= 100 && this.corn_ >= 100) {
			this.gold_ -= 100;
			this.corn_ -= 100;
			let trader = new Trader(this.name_  + (++this.nEntities_).toString() , this.cityX_, this.cityY_, this.timeFactor_);
			this.entities_[trader.name] = trader;
			trader.init();
			return true;
		}
		return false;
	}

	createArmy(nb) {
		if(this.gold_ >= 50*nb && this.corn_ >= 50*nb) {
			this.gold_ -= 50;
			this.corn_ -= 50;
			let army = new Army(this.name_ + (++this.nEntities_).toString() , this.cityX_, this.cityY_, this.timeFactor_);
			this.entities_[army.name] = army;
			army.init();
			return true;
		}
		return false;
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
		for(let ent in this.entities_) {
			this.entities_[ent].endWorld();
		}
    clearInterval(this.gaiaEntInterval_);
  }
}

module.exports = {Player};
