const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Player} = require('../player');

chai.use(chaiAsPromised);
chai.should();


describe('player.js', () => {
  describe('Player', () => {
    let p;
    beforeEach(() => {
      p = new Player('test', 1);
    });

    afterEach(() => {
      p.endWorld();
    });

    it('should have 100 corn and gold', async () => {
			p.corn.should.be.equal(100);
			p.gold.should.be.equal(100);
		});

    it('should have 0 entity', async () => {
			Object.keys(p.entities).length.should.be.equal(0);
		});

    it('fieldLevel and tradeLevel should be 1', async () => {
			p.fieldLevel_.should.be.equal(1);
			p.marketLevel_.should.be.equal(1);
		});

    it('should have more and more corn and gold', async () => {
			p.corn.should.be.equal(100);
			p.gold.should.be.equal(100);

			p.init();
			await new Promise(resolve => {
				setTimeout(() => {
					resolve();
				}, 20);
			});
			p.corn.should.be.above(110);
			p.gold.should.be.above(110);
    });
  });

	describe('Upgrade', () => {
		let p;
    beforeEach(() => {
			p = new Player('test', 1);
		});

		afterEach(() => {
			p.endWorld();
		});

		it('should upgrade field', () => {
			p.init();
			p.upgradeField();
			p.fieldLevel_.should.be.equal(1.3);
		});
	});
});
