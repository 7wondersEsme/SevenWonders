const http = require('http');
const fs = require('fs');

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
  socket.emit('ready');
//  socket.emit('message', 'hello from serv');
//  socket.emit('message', 'hello 2 from serv');
});
server.listen(8080);
console.log("server listens");
