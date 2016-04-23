'use strict';

require('dotenv').config();

var wuKey = process.env.WU_KEY;
var forecastKey = process.env.FORECASTIO_KEY;
var twitterKey = process.env.TWITTER_KEY;

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('index.html')
});

app.get('/api', function(req, res) {
  res.send({ wuKey: wuKey,  forecastKey: forecastKey, twitterKey: twitterKey});
});

app.listen(3000, function () {
  console.log('Climate Story listening on port 3000!');
});
