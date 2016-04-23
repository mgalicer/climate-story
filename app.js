'use strict';

require('dotenv').config();
var wuKey = process.env.WU_KEY;
var forecastKey = process.env.FORECASTIO_KEY;
var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('index.html')
});

app.get('/api', function(req, res) {
  res.send({ wuKey: wuKey,  forecastKey: forecastKey });
})

app.listen(3000, function () {
  console.log('Climate Story listening on port 3000!');
  console.log(process.env.WU_KEY);
});
