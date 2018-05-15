const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Board} = require('../board');
const {Entity} = require('../entity');

chai.use(chaiAsPromised);
chai.should();


describe('board.js', () => {
  describe('Board', () => {
    let b;
    before(() => {
      b = new Board('test', 3000, 2000, 1);
    });

    after(() => {
      b.endWorld();
    });

    it('should be 3000x2000', async () => {
      b.w.should.be.equal(3000);
      b.h.should.be.equal(2000);
    });

		it('should add an entity at 10, 20', async () => {
			b.at(10, 20).length.should.be.equal(0);
			b.addEntity(new Entity('test_e', 10, 20, 1, 1));
			b.at(10, 20).length.should.be.equal(1);
		});
	});
});
