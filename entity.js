const EventEmitter = require('events');

class Entity {
	constructor(name, timeFactor) {
		this.name_ = name || 'UNKENTITY';
		this.worldEvents_ = new EventEmitter();
		this.timeFactor_ = timeFactor || 1000;
	}

	init() {
		this.gaiaInterval_ = setInterval(() => {
		}, this.timeFactor_);
	}

	get worldEvents() {
		return this.worldEvents_;
	}

	endWorld() {
		for(let i = 0; i < this.soldiers_.length; i++) {
			this.soldiers_[i].endWorld();
		}
		clearInterval(this.gaiaInterval_);
	}
}

module.exports = {Army};
