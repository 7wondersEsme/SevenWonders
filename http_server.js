const http = require('http');
const url = require('url');

let server = http.createServer((req, res) => {
  let path = url.parse(req.url).pathname;
  if(path != "/") {
    res.writeHead(404, {"Content-Type": "text/html"});
    res.end('Error: Page not found');
  } else {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end('<h1>Salut</h1>');
  }
  console.log(url.parse(req.url).pathname);

});
server.listen(8080);

