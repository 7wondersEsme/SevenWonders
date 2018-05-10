const EventEmitter = require('events');
const {Soldier} = require('./soldier');

class Army {
	constructor(name, timeFactor) {
		this.name_ = name || 'UNKARMY';
		this.soldiers_ = [];
		this.worldEvents_ = new EventEmitter();
		this.timeFactor_ = timeFactor || 1000;
		this.allDead_ = false;
	}

	init() {
		this.worldEvents_.on('allDead', () => {
			for(let i=0; i < this.soldiers_.length; i++) {
				if(this.soldiers_[i].isAlive) {
					this.soldiers_[i].die();
				}
			}
		});
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
			this.addSoldier(new Soldier('s', this.timeFactor_));
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
									this.soldiers[i].die();
								}
								other_touches--;
							}
						}
					} else {
						this.allDie();
					}

					if(self_touches < other.valids) {
						for(let i = 0; i < other.soldiers.length; i++) {
							if(other.soldiers[i].isAlive && !other.soldiers[i].isHurt && self_touches > 0) {
								if(Math.random() > 0.2) {
									other.soldiers[i].hurt();
								} else {
									other.soldiers[i].die();
								}
								self_touches--;
							}
						}
					} else {
						other.allDie();
					}
					resolve();
				}
			}, 5*this.timeFactor_);
		});
	}

  allDie() {
		this.allDead_ = true;
		this.worldEvents_.emit('allDead');
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
		clearInterval(this.gaiaInterval_);
	}
}

module.exports = {Army};
