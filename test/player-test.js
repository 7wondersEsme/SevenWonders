const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Player} = require('../player');

chai.use(chaiAsPromised);
chai.should();


describe('player.js', () => {
  describe('Player', () => {
    let p;
    beforeEach(() => {
      p = new Player('test', 0, 0,  1);
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
				}, 30);
			});
			p.corn.should.be.above(110);
			p.gold.should.be.above(110);
    });
  });

	describe('Upgrade', () => {
		let p;
    beforeEach(() => {
			p = new Player('test', 0, 0, 1);
		});

		afterEach(() => {
			p.endWorld();
		});

		it('should upgrade field', () => {
			p.init();
			p.upgradeField().should.be.equal(true);
			p.fieldLevel_.should.be.equal(1.3);
		});

		it('should upgrade market', () => {
			p.init();
			p.upgradeMarket().should.be.equal(true);
			p.marketLevel_.should.be.equal(1.3);
		});

		it('shouldn\'t upgrade market because not enough gold', () => {
			p.init();
			p.gold_ = 0;
			p.upgradeMarket().should.be.equal(false);
			p.marketLevel_.should.be.equal(1);
		});

		it('shouldn\'t upgrade field because not enough gold', () => {
			p.init();
			p.gold_ = 0;
			p.upgradeField().should.be.equal(false);
			p.fieldLevel_.should.be.equal(1);
		});
	});

	describe('Entities', () => {
		let p;
		beforeEach(() => {
			p = new Player('j1', 0, 0, 1);
		});

		afterEach(() => {
			p.endWorld();
		});

		it('should add trader', () => {
			p.createTrader().should.be.equal(true);
			Object.keys(p.entities).length.should.be.equal(1);
		});

		it('shouldn\'t add trader because not enough gold', () => {
			p.gold_ = 0;
			p.createTrader().should.be.equal(false);
			Object.keys(p.entities).length.should.be.equal(0);
		});

		it('shouldn\'t add trader because not enough corn', () => {
			p.corn_ = 0;
			p.createTrader().should.be.equal(false);
			Object.keys(p.entities).length.should.be.equal(0);
		});

		it('should add 2 traders', () => {
			p.gold_ = 200;
			p.corn_ = 200;
			p.createTrader().should.be.equal(true);
			p.createTrader().should.be.equal(true);
			Object.keys(p.entities).length.should.be.equal(2);
		});

		it('should add army', () => {
			p.corn_ = 1000;
			p.gold_ = 1000;
      p.createArmy(10).should.be.equal(true);
      Object.keys(p.entities).length.should.be.equal(1);
    });

    it('shouldn\'t add army because not enough gold', () => {
      p.gold_ = 0;
      p.createArmy(1).should.be.equal(false);
      Object.keys(p.entities).length.should.be.equal(0);
    });

    it('shouldn\'t add army because not enough corn', () => {
      p.corn_ = 0;
      p.createArmy(1).should.be.equal(false);
      Object.keys(p.entities).length.should.be.equal(0);
    });

    it('should add 2 armies', () => {
      p.gold_ = 200;
      p.corn_ = 200;
      p.createArmy(1).should.be.equal(true);
      p.createArmy(1).should.be.equal(true);
      Object.keys(p.entities).length.should.be.equal(2);
    });
	});
});
