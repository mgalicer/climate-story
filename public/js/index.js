'use strict'

var wuKey = process.env.WU_KEY

//Figure out how to pull the current date
//Then convert the date to YYYYMMDD format.
var currentDate;

//Using lat & long from geolocation, get the state (format: NY)
var state;

//using lat & long from geolocation, get the city (format: New_York)
var city;

var getHistory = function(){
  console.log('in getHistory fn');
  $.ajax({
    // url: "http://api.wunderground.com/api/" + wuKey + "/history_" + currentDate + "/q/" + state + "/" + city + ".json",
    url: "http://api.wunderground.com/api/" + wuKey + "/history_20160423/q/NY/New_York.json",
    method: "GET",
    data: weatherHistory
  }).done(function(weatherHistory){
    console.log("data: " + weatherHistory);
  });
};

function getCurrentWeather(){
    $.ajax({
      url : "http://api.wunderground.com/api/" + wuKey + "/geolookup/conditions/q/IA/" +  + ".json",
      dataType : "jsonp",
      success : function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_f = parsed_json['current_observation']['temp_f'];
      alert("Current temperature in " + location + " is: " + temp_f);
      }
      });
});


$( document ).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var position = [position.coords.latitude, position.coords.longitude];
    });
});


