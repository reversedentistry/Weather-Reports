var APIkey = "cc11cb432484c7170f84edd3a05552d8";

var searchBtn = document.querySelector("#search-btn");

var searchHistory = document.querySelector("#search-history"); 
var currentWeatherBody = document.querySelector(".card-body");
var fiveDayForecast = document.querySelector("#five-day-forecast"); 

searchBtn.addEventListener("click", callWeatherApi);


function callWeatherApi() {
  // Get lat + long coordinates first 
  let userSearch = document.querySelector("#location-search").value;
  let coordinateUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userSearch + "&limit=1&appid=" + APIkey;

  console.log(coordinateUrl);

  fetch(coordinateUrl)
    .then(function (response) {
      if (!response.ok) {
        return; 
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat
      let long = data[0].lon
      let cityName = data[0].name 
      displayCityName(cityName);

      let oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=hourly,minutely&appid=" + APIkey;

      console.log(oneCallUrl);

      fetch(oneCallUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          // display results on page SOMEHOW
          printCurrent(data);
          // printFiveDay(data)??????; 
        })
    }
       
    );
    // Add user search to history list if something is found 
    let userSearchHistory = document.createElement("li"); 
    userSearchHistory.textContent = userSearch; 
    searchHistory.append(userSearchHistory); 

}

function displayCityName(name) {
  currentWeatherBody.innerHTML = ""; 
  let cityNameEl = document.createElement("h2"); 
  cityNameEl.classList.add("card-title"); 
  cityNameEl.textContent = name; 
  console.log(cityNameEl)
  currentWeatherBody.append(cityNameEl);  
}

function printCurrent(currentWeatherResult) {
  console.log(currentWeatherResult);
  
  let currentTemp = document.createElement("p"); 
  currentTemp.classList.add("card-text"); 
  currentTemp.textContent = currentWeatherResult.current.temp 
  currentWeatherBody.append(currentTemp); 
  console.log(currentTemp); 

  // preliminary five day forecast draft 
  for (let i = 0; i < currentWeatherResult.daily.length; i++) {

  }
}

