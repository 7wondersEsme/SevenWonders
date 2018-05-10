const readline = require('readline');

const {Divinity} = require('./divinity');
const {Soldier} = require('./soldier');
const {Army} = require('./army');

function test_attack_armies() {
	let a1 = new Army('A1', 100);
	let a2 = new Army('A2', 100);
	a1.add(10);
	a2.add(1000);
	setInterval(() => {
		console.log("A1: " + a1.valids + "/" + a1.count);
		console.log("A2: " + a2.valids + "/" + a2.count);
	}, 100);
	a1.init();
	a2.init();
	setInterval(() => {
		a1.attack(a2);
	}, 1000);
	setTimeout(() => {
		process.exit();
	}, 5000);
}

function main() {
  let g;
  let rl = readline.createInterface(process.stdin, process.stdout);
  g = new Divinity('Gaia', 100);
  my_state = {corn: 0, gold: 0};
  rl.on("line", answer => {
		a_corn = answer.split(' ')[0];
		a_gold = answer.split(' ')[1];
		console.log("--" + answer + "--");
    my_state.corn -= Number(a_corn);
    g.offeringCorn(Number(a_corn));
    my_state.gold -= Number(a_gold);
    g.offeringGold(Number(a_gold));
		console.log(my_state);
  });
  g.worldEvents.on('favor', function(favor) {
    my_state.corn += favor.corn;
    my_state.gold += favor.gold;
  });
  g.worldEvents.on('blessing', function(favor) {
    my_state.corn += favor.corn;
    my_state.gold += favor.gold;
  });

  g.init();
	for(i=0;i<list_s.length;i++) {
		list_s[i].init();
	}

	stats = [];
	last_compte = 400;
	setInterval(() =>{
		compteur = 0;
		for(i=0;i<list_s.length;i++){
			if(list_s[i].isAlive) {
				compteur++;
			}
		}
		console.log(compteur);
		stats.push(Array(last_compte - compteur+1).join('-'));
		last_compte = compteur;
	}, 30);
  setTimeout(() => {
    g.endWorld();
		console.log(stats);
		process.exit();
  }, 2000);
}

//main();
test_attack_armies();
