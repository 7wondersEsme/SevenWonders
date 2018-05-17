//var socket = io.connect('http://ec2-18-218-126-224.us-east-2.compute.amazonaws.com:8080');
var socket = io.connect('http://localhost:8080');

var entities = {};

function setup() {
  var canvas = createCanvas(600, 300);
  canvas.parent('map');
  socket.on('ready', () => {
    console.log('ready received');
    socket.on('move', ent => {
      entities[ent.name] = ent;
    });
		$("#1010").on('click', () => {
			socket.emit('action', [{x: 0, y: 0}, {x: 0, y: 0}]);
		});
		$("#5050").on('click', () => {
			socket.emit('action', [{x: 200, y: 0}, {x: 200, y: 0}]);
		});
		$("#debug").on('click', () => {
			console.log(entities);
		});
  });
}
 
function draw() {
  background(255);
  for(e in entities) {
    if(entities[e].type === 'army') {
      rect(entities[e].x, entities[e].y, 10, 10);
    }
    if(entities[e].type === 'trader') {
      ellipse(entities[e].x, entities[e].y, 10, 10);
    }
  }
}
