const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const cors = require('cors');
const app = express();

const frontUrl = 'http://smite-watcher.herokuapp.com/';
const options = {
  headers: {
    "x-api-key": "31f82e63-e734-44d0-8598-a5ee96fd6a3c"
  }
};

const smiteGuruUrl = 'https://api.smite.guru/v3';

const apiSmiteGuruUrls = {
  search: `${smiteGuruUrl}/search`, // ?term=cikidark&type=Player
  profiles: `${smiteGuruUrl}/profiles` // 1610525-CikiDark/matches?page=1
};

app.use(cors());
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', frontUrl);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


app.post('/login', function (req, res) {
  if(req.body.username === 'lb' && req.body.password === 'noob') {
    res.send({auth: true});
  }
  res.send({auth: false});
});

app.post('/search', function (req, res) {
  const url = `${apiSmiteGuruUrls.search}?term=${req.body.username}&type=Player`;
  let chunks = [];
  https.get(url, options, (r) => {
    r.on('data', (d) => {
      chunks.push(d);
    });
    r.on('end', () => {
      let data = Buffer.concat(chunks);
      let result = JSON.parse(data);
      result.push({type: 'search', col: req.body.col});
      broadcast(result);
      res.send(result);
    });
  }).on('error', (e) => {
    console.error(e);
  });
});
app.post('/historic', function (req, res) {
  const url = `${apiSmiteGuruUrls.profiles}/${req.body.username}/matches?page=1`;
  let chunks = [];
  https.get(url, options, (r) => {
    r.on('data', (d) => {
      chunks.push(d);
    });
    r.on('end', () => {
      let data = Buffer.concat(chunks);
      let result = [JSON.parse(data)];
      result.push({type: 'historic', col: req.body.col});
      broadcast(result);
      res.send(result);
    });
  }).on('error', (e) => {
    console.error(e);
  });
});
app.post('/stats', function (req, res) {
  const url = `${apiSmiteGuruUrls.profiles}/${req.body.username}/queues?season=7&ranked=true`;
  let chunks = [];
  https.get(url, options, (r) => {
    r.on('data', (d) => {
      chunks.push(d);
    });
    r.on('end', () => {
      let data = Buffer.concat(chunks);
      let result = [JSON.parse(data)];
      result.push({type: 'stats', col: req.body.col});
      broadcast(result);
      res.send(result);
    });
  }).on('error', (e) => {
    console.error(e);
  });
});



/// WebSocket ///

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
  console.log('ws connected');
});

function broadcast(data) {
  wss.clients.forEach(function each(client) {
    console.log('sending to a client');
    if (client.readyState === WebSocket.OPEN) {
      console.log('sending', data);
      client.send(JSON.stringify(data));
    }
  });
}

/// --------- ///



app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});