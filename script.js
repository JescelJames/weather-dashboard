const cityFormEl = document.querySelector('#city-form');

const cityInputEl = document.querySelector('#city-input');

const weatherContainerEl = document.querySelector('#weather-container');

// require('dotenv').config({ path: "./.env"});

/** I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed */
const formSubmitHandler = function (event) {
  event.preventDefault();

  const city = cityInputEl.value.trim();

  if (city) {
    getWeather(city);

    weatherContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a city');
  }
};


const apiKey = '860b77e2c61e7428da83b0fae8b02a9b';
// const virginiaApiKey = '5aba8aa883b71e2be269be5263025741';



const getWeather = function (city) {
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch (weatherApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    console.log(data);

    var weatherData = data;
    
    // CREATE _______________________________________
      var cityDate = document.createElement('h5')
      var cityName = document.createElement('h6');
      var weatherMain = document.createElement('p');
      var weatherIcon = document.createElement('img')
      var cityTemp = document.createElement('p');
      var cityWind = document.createElement('p');
      var cityHumidity = document.createElement('p');

    // BUILD ____________________________________________
      var unixDate = weatherData.dt; // unixDate api data date is in unix
      var date = new Date(unixDate * 1000) // convert date
      cityDate.textContent = date.toLocaleDateString(); // binds to local date string

      cityName.textContent = weatherData.name;
      weatherMain.textContent = weatherData.weather[0].main
      // Weather Icon
      var iconCode = weatherData.weather[0].icon; // https://openweathermap.org/weather-conditions#Icon-list
      var iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; 
      weatherIcon.src = iconUrl;
      weatherIcon.classList.add('weather-icon'); //makes icon smaller

      cityTemp.textContent = `Temp: ${weatherData.main.temp} F`
      cityWind.textContent = `Wind: ${weatherData.wind.speed} MPH`
      cityHumidity.textContent = `Humidity: ${weatherData.main.humidity} %`
    
    
    // PLACE ___________________________________________
      weatherContainerEl.appendChild(cityDate);
      weatherContainerEl.appendChild(cityName);
      weatherContainerEl.appendChild(weatherMain);
      weatherContainerEl.appendChild(weatherIcon);
      weatherContainerEl.appendChild(cityTemp);
      weatherContainerEl.appendChild(cityWind);
      weatherContainerEl.appendChild(cityHumidity);
  })

  

}
cityFormEl.addEventListener('submit', formSubmitHandler);

// getWeather();