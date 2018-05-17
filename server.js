const http = require('http');
const fs = require('fs');
const {Entity} = require('./entity');
const {Army} = require('./army');
const {Trader} = require('./trader');

let server = http.createServer((req, res) => {
  let path = req.url;
  switch(path) {
    case '/client.js':
      path = "./client.js";
      break;
    case '/jquery-3.3.1.js':
      path = "./jquery-3.3.1.js";
      break;
    case '/sketch.js':
      path = "./sketch.js";
      break;
    case '/p5.min.js':
      path = "./p5.min.js";
      break;
    default:
      path = "./index.html";
  }
  fs.readFile(path, 'utf-8', (error, content) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(content);
  });
});

const io = require('socket.io').listen(server)
io.sockets.on('connection', socket => {
  console.log('new client');
  socket.on('action', action => {
    console.log('action: ' + action);
    socket.emit('message', 'action taken into account: ' + action);
  });
  let e = new Army('test', 20, 20, 2, 1000);
  let t = new Trader('test-t', 200, 200, 1, 1000);
  socket.emit('ready');
  console.log("ready sent");
  e.worldEvents.on('move', pos => {
    socket.emit('move', {name: e.name, x: e.x, y: e.y, type: 'army'});
  });
  t.worldEvents.on('move', pos => {
    socket.emit('move', {name: t.name, x: t.x, y: t.y, type: 'trader'});
  });
  t.init();
  t.moveTo(200, 10);
  e.init();
  e.moveTo(100, 100);
//  socket.emit('message', 'hello from serv');
//  socket.emit('message', 'hello 2 from serv');
});
server.listen(8080);
console.log("server listens");
