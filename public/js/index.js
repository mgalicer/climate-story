'use strict';

$( document ).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = [position.coords.latitude, position.coords.longitude];
      // getCurrentWeather(pos)
    });
    getApiKeys();
    getHistory();
});

var wuKey;

var forecastKey;

//Figure out how to pull the current date
//Then convert the date to YYYYMMDD format.
var currentDate;

//Using lat & long from geolocation, get the state (format: NY)
var state;

//using lat & long from geolocation, get the city (format: New_York)
var city;


function getCurrentWeather(pos){
    $.ajax({
        url : "http://api.wunderground.com/api/" + wuKey + "/conditions/q/" + pos.join(",") + ".json",
        dataType : "jsonp",
        method: "GET"
    }).done(function(data){
        console.log(data)
    })
}

var getHistory = function(){
  console.log('in getHistory fn');
  // $.ajax({
  //   // url: "http://api.wunderground.com/api/" + wuKey + "/history_" + currentDate + "/q/" + state + "/" + city + ".json",
  //   url: "http://api.wunderground.com/api/" + wuKey + "/history_20160423/q/NY/New_York.json",
  //   method: "GET",
  //   data: weatherHistory
  // }).done(function(weatherHistory){
  //   console.log("data: " + weatherHistory);
  // });
};

var getApiKeys = function(){
  $.ajax({
    url: "/api",
    method: "GET"
    // data: apiInfo
  }).done(function(data){
    wuKey = data.wuKey;
    forecastKey = data.forecastKey;
    console.log(wuKey);
  })
}
