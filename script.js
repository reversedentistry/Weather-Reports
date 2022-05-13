var APIkey = "cc11cb432484c7170f84edd3a05552d8"; 

var searchBtn = document.querySelector("#search-btn"); 
var currentWeatherCard = document.querySelector("#current-weather"); 

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

      var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,minutely&appid=" + APIkey; 
      
      console.log(oneCallUrl); 
      
      fetch(oneCallUrl) 
        .then(function (response) {
          return response.json()  
      })
      .then(function (data) {
        console.log(data); 
        // display results on page
      })
    }
  ); 

}

function printResults() {
  let currentWeather = document.createElement("div"); 
  currentWeather.classList.add("card-body"); 
  currentWeather.append(currentWeatherCard)
}