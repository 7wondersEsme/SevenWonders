const EventEmitter = require('events');
const {Soldier} = require('./soldier');
const {Entity} = require('./entity');

class Army extends Entity{
	constructor(name, x, y, timeFactor) {
		super(name, x, y, 2, timeFactor);
		this.soldiers_ = [];
		this.allDead_ = false;
	}

	init() {
		super.init();
		for(let i = 0; i < this.soldiers_.length; i++) {
			this.soldiers_[i].init();
		}

		this.gaiaInterval_ = setInterval(() => {
		}, this.timeFactor_);
	}

  addSoldier(s) {
		this.soldiers_.push(s);
	}
	
	add(nb) {
		for(let i = 0; i < nb; i++) {
			this.addSoldier(new Soldier('s', this.timeFactor_*10));
		}
	}

	attack(other) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				let self_touches = 0;
				if(this.allDead || other.allDead) {
					resolve();
				} else {
					for(let i = 0; i < this.valids; i++) {
						if(Math.random() > 0.80) {
							self_touches++;
						}
					}
					let other_touches = 0;
					for(let i = 0; i < other.valids; i++) {
						if(Math.random() > 0.80) {
							other_touches++;
						}
					}

					if(other_touches < this.valids) {
						for(let i = 0; i < this.soldiers.length; i++) {
							if(this.soldiers[i].isAlive && !this.soldiers[i].isHurt && other_touches > 0) {
								if(Math.random() > 0.2) {
									this.soldiers[i].hurt();
								} else {
									this.soldiers[i].endWorld();
								}
								other_touches--;
							}
						}
					} else {
						this.endWorld();
					}

					if(self_touches < other.valids) {
						for(let i = 0; i < other.soldiers.length; i++) {
							if(other.soldiers[i].isAlive && !other.soldiers[i].isHurt && self_touches > 0) {
								if(Math.random() > 0.2) {
									other.soldiers[i].hurt();
								} else {
									other.soldiers[i].endWorld();
								}
								self_touches--;
							}
						}
					} else {
						other.endWorld();
					}
					resolve();
				}
			}, 5*this.timeFactor_);
		});
	}

	get count() {
		let count_ = 0;
		for(let i = 0; i < this.soldiers_.length; i++) {
			if (this.soldiers_[i].isAlive) {
				count_++;
			}
		}
		return count_;
	}

	get valids() {
		let count_ = 0;
		for(let i = 0; i < this.soldiers_.length; i++) {
			if (this.soldiers_[i].isAlive && !this.soldiers_[i].isHurt) {
				count_++;
			}
		}
		return count_;
	}

	get soldiers() {
		return this.soldiers_;
	}

	get allDead() {
		return this.allDead_;
	}

	get worldEvents() {
		return this.worldEvents_;
	}

	endWorld() {
		for(let i = 0; i < this.soldiers_.length; i++) {
			this.soldiers_[i].endWorld();
		}
		this.allDead_ = true;
		clearInterval(this.gaiaInterval_);
		super.endWorld();
	}
}

module.exports = {Army};
