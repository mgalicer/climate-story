// 'use strict';

$( document ).ready(function() {
    getApiKeys();
    makeMap();
});

var wuKey;

var forecastKey;

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
      getTimeMachine(position);
    })
}


function getCurrentWeather(position){
    $.ajax({
        url : "http://api.wunderground.com/api/" + wuKey + "/conditions/q/" + position.join(",") + ".json",
        dataType : "jsonp",
        method: "GET"
    }).done(function(data){
        var weatherString = "Today's weather: " + data.current_observation.temp_f + " and " + data.current_observation.weather.toLowerCase() + "!";
        $("#weather-today").html(weatherString)
    })
}

var pastTemp;
var fiftyYearsAgoPretty;

function getTimeMachine(position){
    //Get the date in milliseconds since 1 January 1970 00:00:00
    var currentDate = Date.now();
    // var pastTemp;
    //Then convert the date to UNIX time to fit Forecast.io API call format
    var formattedTime = Math.floor(currentDate / 1000);
    console.log('currentDate: ' + currentDate);
    //To get a previous time, subtract 50 years' worth of seconds from the current date.
    //Account for leap years: 50 / 4 = 12.5-- round up to 13 'extra' leap days
    var seconds = (  ((37 * 365) + (13 * 366))  * 24 * 60 * 60 );
    var fiftyYearsAgo = ( formattedTime - seconds );
    var fiftyYearsAgoMilliseconds = new Date( fiftyYearsAgo * 1000);
    fiftyYearsAgoPretty = fiftyYearsAgoMilliseconds.toDateString();
    console.log(fiftyYearsAgoPretty);
    // var checkDate = Date.UTC(1966, 3, 24);
    // var fiftyYaObject = new Date( (-116413916 * 1000) );
    // var fiftyCheck = fiftyYaObject.toUTCString();
    // console.log('check Date: ' + checkDate);
    console.log('formattedDate: ' + fiftyYearsAgo);
    // console.log('fifty check: ' + fiftyCheck);
    $.ajax({
        url: "https://api.forecast.io/forecast/" + forecastKey + "/" + position[0] + "," + position[1] + "," + fiftyYearsAgo,
        dataType: "jsonp",
        method: "GET"
    }).done(function(data){
        pastTemp = data.currently.temperature;
        console.log(pastTemp);
        return pastTemp;
    }).done(function(data){
        getHistory();
    })
}

function getHistory(){
  $.ajax({
    url: "http://api.wunderground.com/api/" + wuKey + "/almanac/q/NY/New_York.json",
    method: "GET"
}).done(function(data){
    var avgHigh = data.almanac.temp_high.normal.F;
    showHistory(data);
  });
};

function showHistory(data){
    var storySection = $('#story-section');
    storySection.append('<p>Fifty years ago today, on ' + fiftyYearsAgoPretty + ', the temperature was: ' +  pastTemp + ' ℉</p>');
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
  })
}
