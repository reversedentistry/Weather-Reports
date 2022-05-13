var APIkey = "cc11cb432484c7170f84edd3a05552d8"; 

var searchBtn = document.querySelector("#search-btn"); 

searchBtn.addEventListener("click", callWeatherApi); 

function callWeatherApi() {
// Get lat + long coordinates first 
var userSearch = document.querySelector("#location-search").value;
var coordinateUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userSearch + "&limit=1&appid=" + APIkey;

console.log(coordinateUrl); 

fetch(coordinateUrl)
  .then(function (response) {
      return response.json(); 
  })
  .then(function (data) {
      console.log(data); 
      var lat = data[0].lat 
      var long = data[0].lon
      console.log(lat, long);
      
      //fetch(url + lat + long + awoiegjawoefijaweo)
      
  }); 


}