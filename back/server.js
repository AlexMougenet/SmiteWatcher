var http = require('http');
http.createServer(function (req, res) {
  let canvasDOM = decodeURI(req.url.split('/?canvasDOM=')[1]);
  if (canvasDOM.includes('&')) {
    canvasDOM = decodeURI(canvasDOM.split('&')[0]);
  }
  console.log('canvasDOM', canvasDOM);
  res.writeHead(200, {'Content-Type': 'application/json'});
  if (canvasDOM === 'TG91aXMgU1BJRVJFTkJVUkc') {
    res.end('false');
  }
  res.end('true');
}).listen(process.env.PORT || 80);