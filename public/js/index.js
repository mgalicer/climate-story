'use strict'

var api = ('./api.js');

$( document ).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
    });
});
