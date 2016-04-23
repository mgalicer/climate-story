var wuKey = process.env.WU_KEY

//Figure out how to pull the current date
//Then convert the date to YYYYMMDD format.
var currentDate;

//Using lat & long from geolocation, get the state (format: NY)
var state;

//using lat & long from geolocation, get the city (format: New_York)
var city;

$.ajax({
  // url: "http://api.wunderground.com/api/" + wuKey + "/history_" + currentDate + "/q/" + state + "/" + city + ".json",
  url: "http://api.wunderground.com/api/" + wuKey + "/history_20160423/q/NY/New_York.json"
  method: "GET",
  data: weatherHistory
}).done(function(data){
  console.log("data: " + data);
});
