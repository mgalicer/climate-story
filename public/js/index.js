'use strict';

$( document ).ready(function() {
    getApiKeys();
    makeMap();
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

var position;

function makeMap(){
    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
}

function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
      position = [position.coords.latitude, position.coords.longitude];
      getCurrentWeather(position);
    })
}

function getCurrentWeather(position){
    $.ajax({
        url : "http://api.wunderground.com/api/" + wuKey + "/conditions/q/" + position.join(",") + ".json",
        dataType : "jsonp",
        method: "GET"
    }).done(function(data){
        $("#temp-today").html(data.current_observation.temp_f)
        $("#weather-today").html(data.current_observation.weather)
    })
}

function getHistory(){
  console.log('in getHistory fn');
  $.ajax({
    // url: "http://api.wunderground.com/api/" + wuKey + "/history_" + currentDate + "/q/" + state + "/" + city + ".json",
    url: "http://api.wunderground.com/api/" + wuKey + "/almanac/q/NY/New_York.json",
    method: "GET"
}).done(function(data){
    var avgHigh = data.almanac.temp_high.normal.F
    console.log("average high: " + avgHigh);
    showHistory(data);
  });
};

function showHistory(data){
    var storySection = $('#story-section');
    storySection.append('<p> Average High Temperature: ' + data.almanac.temp_high.normal.F + ' ℉</p>');
    storySection.append('<p> Record High Temperature: ' + data.almanac.temp_high.record.F + ' ℉</p>');
}

function getApiKeys(){
  $.ajax({
    url: "/api",
    method: "GET"
  }).done(function(data){
    wuKey = data.wuKey;
    forecastKey = data.forecastKey;
  }).done(function(data){
    getLocation()
  }).done(function(data){
    getHistory()
  })
}
