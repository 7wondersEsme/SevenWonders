var socket = io.connect('http://ec2-18-218-126-224.us-east-2.compute.amazonaws.com:8080');
//var socket = io.connect('http://localhost:8080');
/*socket.on('ready', () => {
  socket.on('message', message => {
    alert(message);
  });
  $("p").on('click', () => {
    socket.emit('action', 'test du click sur paragraphe');
  });
  $("button").on('click', () => {
    socket.emit('action', 'test bouton');
  });
  console.log("ready");
});*/

var entities = {};

function setup() {
  var canvas = createCanvas(600, 300);
  canvas.parent('map');
  socket.on('ready', () => {
    console.log('ready received');
    socket.on('move', ent => {
      entities[ent.name] = ent;
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
