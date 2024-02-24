// DEPENDENCIES DOM Elements__________________________________________
const cityFormEl = document.querySelector("#city-form");
const cityInputEl = document.querySelector("#city-input");
const weatherContainerEl = document.querySelector("#weather-container");
const forecastContainerEl = document.querySelector('#forecast-container');
const citySearchTermEl = document.querySelector("#city-searched");
const historyContainerEl = document.querySelector("#history-container");

// require('dotenv').config({ path: "./.env"});


// DATA ____________________________________________________
const apiKey = "860b77e2c61e7428da83b0fae8b02a9b";
console.log(window);



// HELPER FUNCTIONS _________________________________________

 // Form Handler 
  const formSubmitHandler = function (event) {
    event.preventDefault();

    const city = cityInputEl.value.trim();

    if (city) {
      // getWeather(city); // argument aka "baseball" passes (city) to getWeather function "glove"
      getForecastWeather(city);
      addCityButton(city);
            
      weatherContainerEl.textContent = "";
      cityInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
  };


 // API TODAY'S WEATHER
  const getWeather = function (city) {
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    citySearchTermEl.textContent = city.toUpperCase();

    fetch(weatherApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        const weatherData = data;

        // CREATE _______________________________________
        const cityDate = document.createElement("h5");
        const cityName = document.createElement("h6");
        const weatherMain = document.createElement("p");
        const weatherIcon = document.createElement("img");
        const cityTemp = document.createElement("p");
        const cityWind = document.createElement("p");
        const cityHumidity = document.createElement("p");

        // BUILD ____________________________________________
        const unixDate = weatherData.dt; // unixDate api data date is in unix
        const date = new Date(unixDate * 1000); // convert date
        cityDate.textContent = date.toLocaleDateString(); // binds to local date string

        cityName.textContent = weatherData.name;
        weatherMain.textContent = weatherData.weather[0].main;
        // Weather Icon
        const iconCode = weatherData.weather[0].icon; // https://openweathermap.org/weather-conditions#Icon-list
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.classList.add("weather-icon"); //makes icon smaller

        cityTemp.textContent = `Temp: ${weatherData.main.temp} F`;
        cityWind.textContent = `Wind: ${weatherData.wind.speed} MPH`;
        cityHumidity.textContent = `Humidity: ${weatherData.main.humidity} %`;

        // PLACE ___________________________________________
        weatherContainerEl.appendChild(cityDate);
        weatherContainerEl.appendChild(cityName);
        weatherContainerEl.appendChild(weatherMain);
        weatherContainerEl.appendChild(weatherIcon);
        weatherContainerEl.appendChild(cityTemp);
        weatherContainerEl.appendChild(cityWind);
        weatherContainerEl.appendChild(cityHumidity);

      });
  };











// API FORECAST WEATHER
const getForecastWeather = function (city) {
  const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  citySearchTermEl.textContent = city.toUpperCase();

  fetch(weatherApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const weatherData = data;

      // CREATE _______________________________________
      // const cityDate = document.createElement("h5");
      const cityName = document.createElement("h6");
      // const weatherMain = document.createElement("p");
      // const weatherIcon = document.createElement("img");
      // const cityTemp = document.createElement("p");
      // const cityWind = document.createElement("p");
      // const cityHumidity = document.createElement("p");

      // BUILD ____________________________________________
      // const unixDate = weatherData.dt; // unixDate api data date is in unix
      // const date = new Date(unixDate * 1000); // convert date
      // cityDate.textContent = date.toLocaleDateString(); // binds to local date string

      cityName.textContent = weatherData.city.name;
      // weatherMain.textContent = weatherData.weather[0].main;
      // // Weather Icon
      // const iconCode = weatherData.weather[0].icon; // https://openweathermap.org/weather-conditions#Icon-list
      // const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
      // weatherIcon.src = iconUrl;
      // weatherIcon.classList.add("weather-icon"); //makes icon smaller

      // cityTemp.textContent = `Temp: ${weatherData.main.temp} F`;
      // cityWind.textContent = `Wind: ${weatherData.wind.speed} MPH`;
      // cityHumidity.textContent = `Humidity: ${weatherData.main.humidity} %`;

      // PLACE ___________________________________________
      // weatherContainerEl.appendChild(cityDate);
      forecastContainerEl.appendChild(cityName);
      // weatherContainerEl.appendChild(weatherMain);
      // weatherContainerEl.appendChild(weatherIcon);
      // weatherContainerEl.appendChild(cityTemp);
      // weatherContainerEl.appendChild(cityWind);
      // weatherContainerEl.appendChild(cityHumidity);

    });
};





 // Searched History
  const addCityButton = function (city) {
    // localStorage.setItem("city", JSON.stringify(city));
    
    // Check if the button already exists
    if (!document.querySelector(`[data-city='${city}']`)) {
      
      // CREATE
      let cityButton = document.createElement("button");
      
      // BUILD
      cityButton.textContent = city.toUpperCase();
      cityButton.classList.add("btn", "btn-primary");
      cityButton.setAttribute("data-city", city); // Use a data attribute for identification
      
      // PLACE 
      historyContainerEl.appendChild(cityButton); 

      // click event listener to re-fetch weather
      cityButton.addEventListener("click", function () {
        weatherContainerEl.textContent = "";
        getWeather(city);
      });
      
      saveCityToHistory(city)
  
    }
  };



  function saveCityToHistory(city) {
    let cities = JSON.parse(localStorage.getItem('citySearchHistory')) || [];
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem('citySearchHistory', JSON.stringify(cities));
    }
  }
  
  function loadCityHistory() {
    const cities = JSON.parse(localStorage.getItem('citySearchHistory')) || [];
    cities.forEach(city => {
      addCityButton(city);
    });
  }




// USER INTERACTIONS _________________________________
cityFormEl.addEventListener("submit", formSubmitHandler);
document.addEventListener('DOMContentLoaded', loadCityHistory);


