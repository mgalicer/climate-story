'use strict'

$( document ).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var position = [position.coords.latitude, position.coords.longitude];
    });
});

function getCurrentWeather(){
    $.ajax({
      url : "http://api.wunderground.com/api/" + process.env.WU_KEY + "/geolookup/conditions/q/IA/" +  + ".json",
      dataType : "jsonp",
      success : function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_f = parsed_json['current_observation']['temp_f'];
      alert("Current temperature in " + location + " is: " + temp_f);
      }
      });
}