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
			e = new Entity('test', 0, 0, 1, 1);
		});

		afterEach(() => {
			e.endWorld();
		});

		it('should move to 10, 10', async () => {
			e.moveTo(10, 10);
			e.init();
			await new Promise( resolve => {
				e.worldEvents.on('onDest', () => {
					resolve();
				});
			});
			e.x.should.be.equal(10);
			e.y.should.be.equal(10);
		});

		it('should move to 100, 100', async () => {
			e.moveTo(100, 100);
			e.init();
			await new Promise( resolve => {
				e.worldEvents.on('onDest', () => {
					resolve();
				});
			});
			e.x.should.be.equal(100);
			e.y.should.be.equal(100);
		});

		it('should move to 0, 0 after going toward 100, 100', async () => {
			e.moveTo(100, 100);
			e.init();
			setTimeout(() => {
				e.moveTo(0, 0);
			}, 100);
			await new Promise( resolve => {
				e.worldEvents.on('onDest', () => {
					resolve();
				});
			});
			e.x.should.be.equal(0);
			e.y.should.be.equal(0);
		});
	});
});
