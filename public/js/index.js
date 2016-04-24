// 'use strict';

$( document ).ready(function() {
    getApiKeys();
});

var wuKey;

var forecastKey;


//Get the date in milliseconds since 1 January 1970 00:00:00
var currentDate = Date.now();

//Then convert the date to UNIX time to fit Forecast.io API call format
var formattedTime = Math.floor(currentDate / 1000);
console.log('currentDate: ' + currentDate);
//To get a previous time, subtract 50 years' worth of milliseconds from the current date.
var milliseconds = ( 50 * 365 * 24 * 60 * 60 );
var fiftyYearsAgo = ( formattedTime - milliseconds );
console.log('formattedDate: ' + fiftyYearsAgo);

//Using lat & long from geolocation, get the state (format: NY)
var state;

//using lat & long from geolocation, get the city (format: New_York)
var city;

var position;

function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
      position = [position.coords.latitude, position.coords.longitude];
      getCurrentWeather(position);
      getTimeMachine(position);
    })
}

function getTimeMachine(position){
    $.ajax({
        url: "https://api.forecast.io/forecast/" + forecastKey + "/" + position[0] + "," + position[1] + "," + fiftyYearsAgo,
        dataType: "jsonp",
        method: "GET"
    }).done(function(data){
        console.log(data);
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
  $.ajax({
    // url: "http://api.wunderground.com/api/" + wuKey + "/history_" + currentDate + "/q/" + state + "/" + city + ".json",
    url: "http://api.wunderground.com/api/" + wuKey + "/almanac/q/NY/New_York.json",
    method: "GET"
}).done(function(data){
    var avgHigh = data.almanac.temp_high.normal.F;
    showHistory(data);
  });
};

function showHistory(data){
    var storySection = $('#story-section');
    storySection.append('<p> Average High Temperature: ' + data.almanac.temp_high.normal.F + ' ℉</p>');
    storySection.append('<p> A record high temperature of <strong>' + data.almanac.temp_high.record.F + ' ℉</strong> was recorded on this day in <strong>' + data.almanac.temp_high.recordyear + '</strong>.');
    storySection.append('<p> Average Low Temperature: ' + data.almanac.temp_low.normal.F + ' ℉</p>');
    storySection.append('<p> A record low temperature of <strong>' + data.almanac.temp_low.record.F + ' ℉</strong> was recorded on this day in <strong>' + data.almanac.temp_low.recordyear + '</strong>.');
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
    getHistory();
  })
  // getTimeMachine();
}
