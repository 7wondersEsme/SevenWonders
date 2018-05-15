const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Entity} = require('../entity');

chai.use(chaiAsPromised);
chai.should();


describe('entity.js', () => {
  describe('Entity', () => {
    let e;
    beforeEach(() => {
      e = new Entity('test', 5, 4, 1, 1);
    });

    afterEach(() => {
      e.endWorld();
    });

    it('should be at 5, 4', async () => {
      e.x.should.be.equal(5);
      e.y.should.be.equal(4);
    });

    it('dest should be at 5, 4', async () => {
      e.dx.should.be.equal(5);
      e.dy.should.be.equal(4);
    });

		it('dest should update to 6, 7', async () => {
			e.moveTo(6, 7);
			e.dx.should.be.equal(6);
			e.dy.should.be.equal(7);
		});
  });
	describe('Move entity', () => {
		let e;
		beforeEach(() => {
			e = new Entity('test', 5, 5, 1, 1);
		});

		afterEach(() => {
			e.endWorld();
		});

		it('should move to 10, 10', async () => {
			e.moveTo(10, 10);
			e.init();
			e.onDest.should.be.equal(false);
			await new Promise(resolve => {
				setTimeout(() => {
					resolve();
				}, 20);
			});
			e.x.should.be.equal(10);
			e.y.should.be.equal(10);
			e.onDest.should.be.equal(true);
		});

		it('should move to 100, 100', async () => {
			e.moveTo(100, 100);
			e.init();
			e.onDest.should.be.equal(false);
			await new Promise( resolve => {
				setTimeout(() => {
					resolve();
				}, 300);
			});
			e.x.should.be.equal(100);
			e.y.should.be.equal(100);
			e.onDest.should.be.equal(true);
		});

		it('should move to 0, 0 after going toward 100, 100', async () => {
			e.moveTo(100, 100);
			e.init();
			e.onDest.should.be.equal(false);
			setTimeout(() => {
				e.moveTo(0, 0);
			}, 100);
			await new Promise( resolve => {
				setTimeout(() => {
					resolve();
				}, 100);
			});
			e.onDest.should.be.equal(false);
			e.x.should.be.above(5);
			e.y.should.be.above(5);
			await new Promise( resolve => {
				setTimeout(() => {
					resolve();
				}, 200);
			});
			e.x.should.be.equal(0);
			e.y.should.be.equal(0);
			e.onDest.should.be.equal(true);
		});

		it('should emit event on move', async () => {
			e.moveTo(10, 10);
			e.init();
			await new Promise(resolve => {
				e.worldEvents.on('move', pos => {
					resolve();
				});
			});
		});

		it('should emit event at each step', async () => {
			e.moveTo(10, 10);
			e.init();
			let i = 0;
			await new Promise(resolve => {
				e.worldEvents.on('move', pos => {
					i++;
					if(e.x === 10) {
						i.should.be.equal(8);
						resolve();
					}
				});
			});
		});

		it('should stop moving after endWorld', async () => {
			e.moveTo(100, 100);
			e.init();
			setTimeout(() => {
				e.endWorld();
			}, 100);
			await new Promise( resolve => {
				setTimeout(() => {
					resolve();
				}, 200);
			});
			e.x.should.be.above(40);
			e.y.should.be.above(40);
			e.x.should.be.below(60);
			e.y.should.be.below(60);
			e.onDest.should.be.equal(false);
		});
	});
});
