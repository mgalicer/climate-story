'use strict';

var express = require('express');
var app = express();
var Forecast = require('forecast.io');
require('dotenv').config();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('index.html')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});