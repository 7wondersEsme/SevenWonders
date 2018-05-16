//var socket = io.connect('http://ec2-18-218-126-224.us-east-2.compute.amazonaws.com:8080');
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
