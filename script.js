var APIkey = "cc11cb432484c7170f84edd3a05552d8";

var searchBtn = document.querySelector("#search-btn");

var searchHistory = document.querySelector("search-history"); 
var currentWeatherCard = document.querySelector("#current-weather");
var fiveDayForecast = document.querySelector("#five-day-forecast"); 

searchBtn.addEventListener("click", callWeatherApi);


function callWeatherApi() {
  // Get lat + long coordinates first 
  let userSearch = document.querySelector("#location-search").value;
  let coordinateUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userSearch + "&limit=1&appid=" + APIkey;

  console.log(coordinateUrl);

  fetch(coordinateUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat
      let long = data[0].lon
      console.log(lat, long);

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
    userSearchHistory.textContent = userSearch
    searchHistory.append(userSearchHistory); 

}

function printCurrent(currentWeatherResult) {
  console.log(currentWeatherResult);

  let currentWeatherBody = document.createElement("div");
  currentWeatherBody.classList.add("card-body");
  currentWeatherBody.append(currentWeatherCard);

  let userSearch = document.querySelector("#location-search").value;
  let currentTitle = document.createElement("h2");
  currentTitle.classList.add("card-title"); 
  currentTitle.textContent = userSearch; 
  console.log(currentTitle);
  currentWeatherBody.append(currentTitle); 

//   let coordinateUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userSearch + "&limit=1&appid=" + APIkey;

//   console.log(coordinateUrl);

//   fetch(coordinateUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);

//       let currentTitle = document.createElement("h2");
//       currentTitle.classList.add("card-title"); 
//       currentTitle.textContent = data[0].name; 
//       console.log(currentTitle);
//       currentWeatherBody.append(currentTitle); 
// })
  
  let currentTemp = document.createElement("p"); 
  currentTemp.classList.add("card-text"); 
  currentTemp.textContent = currentWeatherResult.current.temp 
  currentWeatherBody.append(currentTemp); 
  console.log(currentTemp); 
}

// function printFiveDay()