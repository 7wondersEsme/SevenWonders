var socket = io.connect('http://localhost:8080');
socket.on('ready', () => {
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
});

function setup() {
  var canvas = createCanvas(600, 300);
  canvas.parent('map');
	socket.on('move', pos => {
	  background(255);
	  ellipse(pos.x, pos.y, 2, 2);
	});
}

function draw() {
/*  if(mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
*/
}
