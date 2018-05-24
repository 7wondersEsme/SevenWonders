const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {Army} = require('../army');
const {Soldier} = require('../soldier');

chai.use(chaiAsPromised);
chai.should();


describe('army.js', () => {
  describe('Army', () => {
    let a;
    beforeEach(() => {
      a = new Army('test', 0, 0, 10, 1);
    });

    afterEach(() => {
      a.endWorld();
    });

		it('should have 10 soldiers', () => {
			a.count.should.be.equal(10);
		});
  });

  describe('Attack', () => {
    let a1;
    let a2;

    beforeEach(() => {
      a1 = new Army('A1', 0, 0, 100, 1);
      a2 = new Army('A2', 0, 0, 100, 1);
      a1.init();
      a2.init();
    });

    afterEach(() => {
      a1.endWorld();
      a2.endWorld();
    });

    it('should hurt soldiers', async () => {
      a1.count.should.be.equal(100);
      a1.valids.should.be.equal(100);
      a2.count.should.be.equal(100);
      a2.valids.should.be.equal(100);

      await Promise.all([a1.attack(a2)]);

      a1.valids.should.be.below(100);
      a2.valids.should.be.below(100);
    });

    it('hurt soldiers should not attack', async () => {
      a1.count.should.be.equal(100);
      a2.count.should.be.equal(100);
      a2.valids.should.be.equal(100);
      for(let s in a1.soldiers) {
        a1.soldiers[s].hurt();
      }

      a1.valids.should.be.equal(0);

      await Promise.all([a1.attack(a2)]);

      a2.valids.should.be.equal(100);
    });

    it('should be all dead', async () => {
      a1.count.should.be.equal(100);
      a2.count.should.be.equal(100);
      a2.valids.should.be.equal(100);
			let premier = true;
      for(let s in a1.soldiers) {
				if(premier){
					premier = false;
				} else {
	        a1.soldiers[s].hurt();
				}
      }
      a1.valids.should.be.equal(1);
      await Promise.all([a1.attack(a2)]);
      a1.valids.should.be.equal(0);
			console.log(a1.count);
      a1.count.should.be.equal(0);
    });
  });

  describe('move army', async () => {
    let a;
    beforeEach(() => {
      a = new Army('test', 0, 0, 10, 1);
    });
    
    afterEach(() => {
      a.endWorld();
    });

    it('should be at 0, 0', async () => {
      a.x.should.be.equal(0);
      a.y.should.be.equal(0);
    });
    it('should move to 10, 10', async () => {
      a.moveTo(10, 10);
      a.init();
      await new Promise(resolve => {
        a.worldEvents.on('move', () => {
          if(a.x === 10 && a.y === 10) {
            resolve();
          }
        });
      });
      a.x.should.be.equal(10);
      a.y.should.be.equal(10);
    });
  });
});
