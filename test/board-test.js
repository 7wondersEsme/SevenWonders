const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Board} = require('../board');
const {Entity} = require('../entity');

chai.use(chaiAsPromised);
chai.should();

describe('board.js', () => {
  describe('Board', () => {
    let b;
    let e = new Entity('test_e', 10, 20, 1, 1);
    e.init();

    before(() => {
      b = new Board('test', 600, 300, 1);
    });

    after(() => {
      b.endWorld();
      e.endWorld();
    });

    it('should be 600x300', async () => {
      b.w.should.be.equal(600);
      b.h.should.be.equal(300);
    });
    it('should add an entity at 10, 20', async () => {
      b.at(10, 20).length.should.be.equal(0);
      b.addEntity(e);
      b.at(10, 20).length.should.be.equal(1);
    });
	  it('should move entity on update', async () => {
		  e.moveTo(30, 10);
		  await new Promise(resolve => {
			  e.worldEvents.on('move', () => {
				  if(e.x === 30) {
					  resolve();
				  }
			  });
		  });
		  b.at(30, 10).length.should.be.equal(1);
		  b.at(10, 20).length.should.be.equal(0);
	  });
  });
});
