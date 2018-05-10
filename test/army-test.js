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
      a = new Army('test', 1);
    });

    afterEach(() => {
      a.endWorld();
    });

    it('should add a soldier to army', async () => {
      a.count.should.be.equal(0);

      await a.addSoldier(new Soldier('test_s', 1));
      a.count.should.be.equal(1);
    });

    it('should add 100 soldiers to army', async () => {
      a.count.should.be.equal(0);

      await a.add(100);
      a.count.should.be.equal(100);
    });
  });

	describe('Attack', () => {
		let a1;
		let a2;

		beforeEach(() => {
			a1 = new Army('A1', 1);
			a2 = new Army('A2', 1);
			a1.add(100);
			a2.add(100);
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
			for(let i = 0; i < a1.soldiers.length; i++) {
				a1.soldiers[i].hurt();
			}

			a1.valids.should.be.equal(0);

			await Promise.all([a1.attack(a2)]);

			a2.valids.should.be.equal(100);
		});

		it('should be all dead', async () => {
			a1.count.should.be.equal(100);
			a2.count.should.be.equal(100);
			a2.valids.should.be.equal(100);
			for(let i = 0; i < a1.soldiers.length - 1; i++) {
				a1.soldiers[i].hurt();
			}
			a1.valids.should.be.equal(1);
			a1.allDead.should.be.equal(false);
			await Promise.all([a1.attack(a2)]);
			a1.allDead.should.be.equal(true);
			a1.valids.should.be.equal(0);
			a1.count.should.be.equal(0);
		});

		it('should emit an allDead event', async () => {
			a1.count.should.be.equal(100);
			a2.count.should.be.equal(100);
			a2.valids.should.be.equal(100);
			for(let i = 0; i < a1.soldiers.length - 1; i++) {
				a1.soldiers[i].hurt();
			}
			a1.valids.should.be.equal(1);
			a1.worldEvents.on('allDead', () => {
				a1.allDead.should.be.equal(true);
				a1.valids.should.be.equal(0);
				a1.count.should.be.equal(0);
			});
			await Promise.all([a1.attack(a2)]);
		});
	});
});
