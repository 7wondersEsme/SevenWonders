const EventEmitter = require('events');

class Board {
	constructor(name, w, h, timeFactor) {
		this.name_ = name || 'BOARD';
		this.worldEvents_ = new EventEmitter();
		this.timeFactor_ = timeFactor || 1000;
		this.w_ = w;
		this.h_ = h;
		this.entities_ = new Array(w);
		for(let i = 0; i < w; i++) {
			this.entities_[i] = new Array(h);
			for(let j = 0; j < h; j++) {
				this.entities_[i][j] = [];
			}
		}
	}

	init() {
		this.gaiaEntInterval_ = setInterval(() => {
		}, this.timeFactor_);
	}

	get worldEvents() {
		return this.worldEvents_;
	}

	get w() {
		return this.w_;
	}

	get h() {
		return this.h_;
	}

	addEntity(e) {
		this.entities_[Math.floor(e.x)][Math.floor(e.y)].push(e);
		e.worldEvents.on('move', pos => {
			this.entities_[Math.floor(pos.x)][Math.floor(pos.y)].
			);
	}

	at(x, y) {
		return this.entities_[x][y];
	}



	endWorld() {
		clearInterval(this.gaiaEntInterval_);
	}
}

module.exports = {Board};
