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

};

function displayCityName(name) {
  currentWeatherBody.innerHTML = "";
  let cityNameEl = document.createElement("h2");
  cityNameEl.classList.add("card-title");
  cityNameEl.textContent = name;
  console.log(cityNameEl)
  currentWeatherBody.append(cityNameEl);
};

function addSearchHistory(name) {
  // Add user search to history list if something is found 
  let userSearchHistory = document.createElement("li");
  userSearchHistory.classList.add("list-group-item");
  let historyBtn = document.createElement("button");
  historyBtn.textContent = name;
  historyBtn.classList.add("history-btn", "btn", "btn-danger");
  userSearchHistory.append(historyBtn);
  searchHistory.append(userSearchHistory);

  historyBtn.addEventListener("click", function(event) {
    event.preventDefault(); 
    let btnClicked = event.target.textContent;
    console.log(btnClicked); 
    let coordinateUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + btnClicked + "&limit=1&appid=" + APIkey

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

      fetch(oneCallUrl)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          printResults(data);

        })
  
  }); 

})};

function printResults(currentWeatherResult) {
  console.log(currentWeatherResult);

  let currentTemp = document.createElement("p");
  currentTemp.classList.add("card-text");
  currentTemp.textContent = "Temp: " + currentWeatherResult.current.temp + " F";

  let currentWind = document.createElement("p");
  currentWind.classList.add("card-text");
  currentWind.textContent = "Wind: " + currentWeatherResult.current.wind_speed + " mph";

  let currentHumidity = document.createElement("p");
  currentHumidity.classList.add("card-text");
  currentHumidity.textContent = "Humidity: " + currentWeatherResult.current.humidity + "%"

  let currentUvi = document.createElement("p");
  currentUvi.classList.add("card-text");
  currentUvi.textContent = "UV Index: " + currentWeatherResult.current.uvi;

  currentWeatherBody.append(currentTemp, currentWind, currentHumidity, currentUvi);

  let fiveDayTitle = document.createElement("h5");
  fiveDayTitle.classList.add("card-title"); 
  fiveDayTitle.textContent = "5-Day Forecast";
  fiveDayForecast.innerHTML = "";
  fiveDayForecast.append(fiveDayTitle);
  console.log(fiveDayTitle)

  let forecastRow = document.createElement("div"); 
  forecastRow.classList.add("row", "justify-content-evenly");
  fiveDayForecast.append(forecastRow);


  for (let i = 0; i < 5; i++) {
    forecastDiv = document.createElement("div"); 
    forecastDiv.classList.add("col-lg-2");
    let forecastEl = document.createElement("div");
    forecastEl.classList.add("card");
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let cardDate = document.createElement("h5");
    cardDate.textContent = "Date";
    cardDate.classList.add("card-title");

    let cardTemp = document.createElement("p");
    cardTemp.textContent = currentWeatherResult.daily[i+1].temp.day + " F";
    cardTemp.classList.add("card-text");

    let cardWind = document.createElement("p");
    cardWind.textContent = currentWeatherResult.daily[i+1].wind_speed + " mph";
    cardWind.classList.add("card-text");

    let cardHumidity = document.createElement("p");
    cardHumidity.textContent = currentWeatherResult.daily[i+1].humidity + "%";
    cardHumidity.classList.add("card-text");

    cardBody.append(cardDate, cardTemp, cardWind, cardHumidity);
    forecastEl.append(cardBody);
    forecastDiv.append(forecastEl);
    forecastRow.append(forecastDiv);
    
  }
};