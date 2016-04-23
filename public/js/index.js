// 'use strict';

$( document ).ready(function() {
     navigator.geolocation.getCurrentPosition(function(position) {
      var pos = [position.coords.latitude, position.coords.longitude];
      // getCurrentWeather(pos)
  })
    getApiKeys();
});

var wuKey;

var forecastKey;


//Figure out how to pull the current date
//Then convert the date to UNIX time to fit Forecast.io API call format
var currentDate = Date.now();
console.log('date: ' + currentDate);
var lat = pos[0];
var long = pos[1];

function getTimeMachine(){
    $.ajax({
        url: "https://api.forecast.io/forecast/" + forecastKey + "/" + lat + "," + long + "," + currentDate,
        method: "GET"
    }).done(function(data){
        console.log(data);
    })
}

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

function getHistory(){
  $.ajax({
    // url: "http://api.wunderground.com/api/" + wuKey + "/history_" + currentDate + "/q/" + state + "/" + city + ".json",
    url: "http://api.wunderground.com/api/" + wuKey + "/almanac/q/NY/New_York.json",
    method: "GET"
}).done(function(data){
    var avgHigh = data.almanac.temp_high.normal.F
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

function getApiKeys(getTimeMachine){
  $.ajax({
    url: "/api",
    method: "GET"
  }).done(function(data){
    wuKey = data.wuKey;
    forecastKey = data.forecastKey;
    // return "data";
    console.log(wuKey)
    // return "data";
  }).done(function(data){ getHistory() })
  getTimeMachine();
}
