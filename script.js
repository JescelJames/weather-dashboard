// DEPENDENCIES DOM Elements__________________________________________
const cityFormEl = document.querySelector("#city-form");

const cityInputEl = document.querySelector("#city-input");

const weatherContainerEl = document.querySelector("#weather-container");

const citySearchTerm = document.querySelector("#city-search-term");

const historyContainerEl = document.querySelector('#history-container');

// require('dotenv').config({ path: "./.env"});

// DATA ____________________________________________________
const apiKey = "860b77e2c61e7428da83b0fae8b02a9b";


// HELPER FUNCTIONS _________________________________________
const formSubmitHandler = function (event) {
  event.preventDefault();

  const city = cityInputEl.value.trim();

  if (city) {
    getWeather(city); // argument aka "baseball" passes (city) to getWeather fucntion "glove"
    addCityButton(city);
    weatherContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};



const getWeather = function (city) {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  citySearchTerm.textContent = city.toUpperCase();

  fetch(weatherApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var weatherData = data;

      // CREATE _______________________________________
      var cityDate = document.createElement("h5");
      var cityName = document.createElement("h6");
      var weatherMain = document.createElement("p");
      var weatherIcon = document.createElement("img");
      var cityTemp = document.createElement("p");
      var cityWind = document.createElement("p");
      var cityHumidity = document.createElement("p");

      // var cityInputHistory = document.createElement('button')
      // var

      // BUILD ____________________________________________
      var unixDate = weatherData.dt; // unixDate api data date is in unix
      var date = new Date(unixDate * 1000); // convert date
      cityDate.textContent = date.toLocaleDateString(); // binds to local date string

      cityName.textContent = weatherData.name;
      weatherMain.textContent = weatherData.weather[0].main;
      // Weather Icon
      var iconCode = weatherData.weather[0].icon; // https://openweathermap.org/weather-conditions#Icon-list
      var iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
      weatherIcon.src = iconUrl;
      weatherIcon.classList.add("weather-icon"); //makes icon smaller

      cityTemp.textContent = `Temp: ${weatherData.main.temp} F`;
      cityWind.textContent = `Wind: ${weatherData.wind.speed} MPH`;
      cityHumidity.textContent = `Humidity: ${weatherData.main.humidity} %`;

      // cityInputHistory.textContent = city.toUpperCase();
      // cityInputHistory.classList.add('btn', 'btn-primary');

      // PLACE ___________________________________________
      weatherContainerEl.appendChild(cityDate);
      weatherContainerEl.appendChild(cityName);
      weatherContainerEl.appendChild(weatherMain);
      weatherContainerEl.appendChild(weatherIcon);
      weatherContainerEl.appendChild(cityTemp);
      weatherContainerEl.appendChild(cityWind);
      weatherContainerEl.appendChild(cityHumidity);

      // historyContainerEl.appendChild(cityInputHistory);
    });
};

const addCityButton = function(city) {
  // Check if the button already exists
  if (!document.querySelector(`[data-city='${city}']`)) {

    var cityButton = document.createElement('button');
    cityButton.textContent = city.toUpperCase();
    cityButton.classList.add('btn', 'btn-primary');
    cityButton.setAttribute('data-city', city); // Use a data attribute for identification
    
    // Add click event listener to re-fetch weather
    cityButton.addEventListener('click', function() {
      weatherContainerEl.textContent = "";
      getWeather(city);
    });

    historyContainerEl.appendChild(cityButton);
  }
};
// city input
// renders in a different div
// creates a button
// build a button
// place a button



// USER INTERACTIONS _________________________________
cityFormEl.addEventListener("submit", formSubmitHandler);

// getWeather();

