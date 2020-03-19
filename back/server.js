const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const { Server } = require('ws');
var CLIENTS = [];
var CLIENTS_INTERVAL = {};

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

app.use(bodyParser.json());

app.use(function(req, res, next) {
  var allowedOrigins = ['http://smite-watcher.herokuapp.com', 'https://smite-watcher.herokuapp.com'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});


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

const wss = new Server({server});
wss.on('connection', (ws) => {
  customId = getUniqueID();
  ws.customId = customId;
  ws.getUpdate = true;
  CLIENTS.push(ws);

  if (CLIENTS.length >= 2) {
    console.log('ask for update');
    CLIENTS[0].send(JSON.stringify([{type: 'update', col: null}]));
  } else {
    ws.getUpdate = false;
  }

  CLIENTS_INTERVAL[customId] = setInterval(() => {
    ws.send(JSON.stringify([{type: 'ping', col: null}]));
  }, 20000);
  
  CLIENTS[0].on('message', data => {
    if (ws.getUpdate) {
      console.log('send update', data);
      ws.send(JSON.stringify(data));

      ws.getUpdate = false;
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
    var index = CLIENTS.indexOf(ws);
    if (index !== -1) CLIENTS.splice(index, 1);
    clearInterval(CLIENTS_INTERVAL[ws.customId]);
  });
});

function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
}

function getUniqueID() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};
