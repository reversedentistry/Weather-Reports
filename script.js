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

  fetch(coordinateUrl)
    .then(function (response) {
      // Add modal to alert user if city name cannot be found 
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
      addSearchHistory(cityName);

      let oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=hourly,minutely&appid=" + APIkey;

      fetch(oneCallUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          // display results on page SOMEHOW
          printResults(data);

        })
    }
    );

}

function displayCityName(name) {
  currentWeatherBody.innerHTML = "";
  let cityNameEl = document.createElement("h2");
  cityNameEl.classList.add("card-title");
  cityNameEl.textContent = name;
  console.log(cityNameEl)
  currentWeatherBody.append(cityNameEl);
}

function addSearchHistory(name) {
  // Add user search to history list if something is found 
  let userSearchHistory = document.createElement("li");
  let historyBtn = document.createElement("button");
  historyBtn.textContent = name;
  historyBtn.classList.add("history-btn"); 
  userSearchHistory.append(historyBtn);
  searchHistory.append(userSearchHistory);

}



function printResults(currentWeatherResult) {
  console.log(currentWeatherResult);

  let currentTemp = document.createElement("p");
  currentTemp.classList.add("card-text");
  currentTemp.textContent = currentWeatherResult.current.temp + " F"; 
  
  console.log(currentTemp);

  let currentWind = document.createElement("p");
  currentWind.classList.add("card-text");
  currentWind.textContent = currentWeatherResult.current.wind_speed + " mph"; 
  
  console.log(currentWind);

  let currentHumidity = document.createElement("p");
  currentHumidity.classList.add("card-text");
  currentHumidity.textContent = currentWeatherResult.current.humidity + "%"
  
  console.log(currentHumidity);

  let currentUvi = document.createElement("p");
  currentUvi.classList.add("card-text");
  currentUvi.textContent = currentWeatherResult.current.uvi; 
  
  console.log(currentUvi);

  currentWeatherBody.append(currentTemp, currentWind, currentHumidity, currentUvi); 

  // preliminary five day forecast draft 
  for (let i = 0; i < currentWeatherResult.daily.length; i++) {

  }
}

