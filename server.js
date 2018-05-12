const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
	fs.readFile('./index.html', 'utf-8', (error, content) => {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

const io = require('socket.io').listen(server)
io.sockets.on('connection', socket => {
	console.log("hello");
});
server.listen(8080);
