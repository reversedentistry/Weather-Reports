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
      return response.json();
    })
    .then(function (data) {
      if (data.length == 0) {
        return alert("Your search could not be found. Please try again.");
      }
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
          printResults(data);

        })
    }
    );

};

// Display city exactly as it appears in API to compensate for any user input discrepancies
function displayCityName(name) {
  currentWeatherBody.innerHTML = "";
  let cityNameEl = document.createElement("h2");
  cityNameEl.classList.add("card-title");
  cityNameEl.textContent = name;
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

  historyBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let btnClicked = event.target.textContent;
    console.log(btnClicked);
    let coordinateUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + btnClicked + "&limit=1&appid=" + APIkey

    fetch(coordinateUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let lat = data[0].lat
        let long = data[0].lon
        let cityName = data[0].name
        displayCityName(cityName);
        // Unlike the API call triggered by search, we do not need to add this result into our history list  

        let oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=hourly,minutely&appid=" + APIkey;

        fetch(oneCallUrl)
          .then(function (response) {
            return response.json()
          })
          .then(function (data) {
            printResults(data);

          })

      });

  })
};

function printResults(currentWeatherResult) {
  console.log(currentWeatherResult);

  let date = currentWeatherResult.current.dt; 
  console.log(date); 
  let dateEl = document.createElement("h3"); 
  dateEl.textContent = moment(date).format("M/D/YYYY"); 
  console.log(dateEl);
  
  let weatherIcon = currentWeatherResult.current.weather[0].icon;
  let weatherIconEl = document.createElement("img");
  weatherIconEl.src = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
 
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

  currentWeatherBody.append(dateEl, weatherIconEl, currentTemp, currentWind, currentHumidity, currentUvi);

  let fiveDayTitle = document.createElement("h5");
  fiveDayTitle.classList.add("card-title");
  fiveDayTitle.textContent = "5-Day Forecast";
  fiveDayForecast.innerHTML = "";
  fiveDayForecast.append(fiveDayTitle);
  
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
    let cardDate = currentWeatherResult.daily[i + 1].dt; 
    let cardDateEl = document.createElement("h5");
    cardDateEl.textContent = moment(cardDate).format("M/D/YYYY");
    cardDateEl.classList.add("card-title");

    let cardTemp = document.createElement("p");
    cardTemp.textContent = "Temp: " + currentWeatherResult.daily[i + 1].temp.day + " F";
    cardTemp.classList.add("card-text");

    let cardWind = document.createElement("p");
    cardWind.textContent = "Wind: " + currentWeatherResult.daily[i + 1].wind_speed + " mph";
    cardWind.classList.add("card-text");

    let cardHumidity = document.createElement("p");
    cardHumidity.textContent = "Humidity: " + currentWeatherResult.daily[i + 1].humidity + "%";
    cardHumidity.classList.add("card-text");

    cardBody.append(cardDateEl, cardTemp, cardWind, cardHumidity);
    forecastEl.append(cardBody);
    forecastDiv.append(forecastEl);
    forecastRow.append(forecastDiv);

  }
};