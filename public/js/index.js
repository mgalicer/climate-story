'use strict';

$( document ).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = [position.coords.latitude, position.coords.longitude];
      getCurrentWeather(pos)
    });

    //Figure out how to pull the current date
    //Then convert the date to YYYYMMDD format.
    var currentDate;

    //Using lat & long from geolocation, get the state (format: NY)
    var state;

    //using lat & long from geolocation, get the city (format: New_York)
    var city;
});

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
}

function getCurrentWeather(pos){
    console.log("http://api.wunderground.com/api/02b2d0d796943ad3/conditions/q/" + pos.join(",") + ".json")
    $.ajax({
        url : "http://api.wunderground.com/api//conditions/q/" + pos.join(",") + ".json",
        dataType : "jsonp",
        method: "GET"
    }).done(function(data){
        console.log(data)
    })
}
