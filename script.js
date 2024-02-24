const weatherDataEl = document.querySelector('#repos-container');
// require('dotenv').config({ path: "./.env"});

/** I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed */

const apiKey = '860b77e2c61e7428da83b0fae8b02a9b';
const virginiaApiKey = '5aba8aa883b71e2be269be5263025741';

const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=chicago&units=imperial&appid=${apiKey}`;

function getWeather() {
  fetch (weatherApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    console.log(data);

    var weatherData = data;
    
    // CREATE
    // var cityDate = document.createElement('h5')
    
    var cityName = document.createElement('h6');
    var weatherMain = document.createElement('p');
    var weatherIcon = document.createElement('img')
    var cityTemp = document.createElement('p');
    var cityWind = document.createElement('p');
    // var cityHumidity = document.createElement('p');

    // BUILD
    // cityDate.textContent = weatherData.list[0].dt;
    cityName.textContent = weatherData.name;
    weatherMain.textContent = weatherData.weather[0].main
    // Weather Icon
    var iconCode = weatherData.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png"; 
    weatherIcon.src = iconUrl;
    weatherIcon.classList.add('weather-icon');

    cityTemp.textContent = `Temp: ${weatherData.main.temp} F`
    cityWind.textContent = `Wind: ${weatherData.wind.speed} MPH`
    
    
    // PLACE
        weatherDataEl.appendChild(cityName);
    weatherDataEl.appendChild(weatherMain);
    weatherDataEl.appendChild(weatherIcon);
    weatherDataEl.appendChild(cityTemp);
    weatherDataEl.appendChild(cityWind);

  })

  

}

getWeather();