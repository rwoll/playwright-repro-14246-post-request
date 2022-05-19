const http = require('http');

let reqId = 0;

const server = http.createServer((req, res) => {
  res.write(JSON.stringify({ id: ++reqId }));
  res.end();
});

server.listen(4747);
