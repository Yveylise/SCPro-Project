// define days of the week

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//establish the date.
let now = new Date();

//break down date components.
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

// if current minute is less than 10, return "0" plus the current minute.

function formatMinutes() {
  if (currentMinute < 10) {
    formattedMinutes = `0${currentMinute}`;

    currentMinute = formattedMinutes;
    return currentMinute;
  } else {
    return `${currentMinute}`;
  }
}

function formatHour() {
  let night = "PM";
  let day = "AM";

  if (currentHour > 12) {
    formattedHour = currentHour - 12;
    currentHour = formattedHour;
    dayNightIndicator = `${night}`;
    return currentHour;
  } else {
    dayNightIndicator = `${day}`;
    return `${currentHour}`;
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

// display day of week and user's local time.

currentMinute = formatMinutes();
currentHour = formatHour();
let currentTime = `${currentHour}:${currentMinute} ${dayNightIndicator}`;

let liDate = document.querySelector("li#date");
liDate.innerHTML = `${currentDay}, ${currentTime}`;

// --------------------------------------------

let tempElement = document.querySelector(".defaultTemp");

//Convert to Fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  temperature = farenheitTemperature;
  tempElement.innerHTML = Math.round(temperature);
}

//Convert to Celcius
function convertToCelsius(event) {
  event.preventDefault();
  temperature = farenheitTemperature;
  tempElement.innerHTML = Math.round((temperature - 32) * (5 / 9));
}

let farenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// --------------USER SEARCH-------------------------
let userSearchForm = document.querySelector("#form");
userSearchForm.addEventListener("submit", userSearch);

function userSearch(event) {
  event.preventDefault();
  let userCity = document.querySelector("#site-search");
  let userCityValue = userCity.value;
  let apiKey = "2d226cd19a47dc1aded74f5d314dd190";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityValue}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayWeather);
}

// Display Weather Info
function displayWeather(response) {
  let localCityName = response.data.name;
  let localTemperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let skyDescription = response.data.weather[0].description;

  farenheitTemperature = response.data.main.temp;

  let liCity = document.querySelector("li#city");
  liCity.innerHTML = `${localCityName}`;

  let liTemp = document.querySelector(".defaultTemp");
  liTemp.innerHTML = `${localTemperature}`;

  let liWindSpeed = document.querySelector(".mph");
  liWindSpeed.innerHTML = `${windSpeed}`;

  let liSky = document.querySelector("li#sky");
  liSky.innerHTML = `${skyDescription}`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
// --------------CURRENT LOCATION-------------------------

function currentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "2d226cd19a47dc1aded74f5d314dd190";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentLocationButton = document.querySelector(".current-location-search");
currentLocationButton.addEventListener("click", getCurrentLocation);

// ----- Forecast -----

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastDay0 = document.querySelector("#forecastDay0");
  let forecastDay1 = document.querySelector("#forecastDay1");
  let forecastDay2 = document.querySelector("#forecastDay2");
  let forecastDay3 = document.querySelector("#forecastDay3");
  let forecastDay4 = document.querySelector("#forecastDay4");
  let forecastDay5 = document.querySelector("#forecastDay5");

  forecastDay0.innerHTML = `
    <div class="col-6" id="forecastText">
    ${formatDay(forecast[0].dt)}
    <br />
    ${Math.round(forecast[0].temp.max)}° / ${Math.round(forecast[0].temp.min)}°
  </div>
      <div class="col-6" id="forecastIcon">
      <img
      src="http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}.png"
      alt="Clear"
      id="futureIcon"
      class="float-right"
      />
      </div>`;

  forecastDay1.innerHTML = `
    <div class="col-6" id="forecastText">
    ${formatDay(forecast[1].dt)}
    <br />
    ${Math.round(forecast[1].temp.max)}° / ${Math.round(forecast[1].temp.min)}°
  </div>
      <div class="col-6" id="forecastIcon">
      <img
      src="http://openweathermap.org/img/wn/${forecast[1].weather[0].icon}.png"
      alt="Clear"
      id="futureIcon"
      class="float-right"
      />
      </div>`;

  forecastDay2.innerHTML = `
    <div class="col-6" id="forecastText">
    ${formatDay(forecast[2].dt)}
    <br />
    ${Math.round(forecast[2].temp.max)}° / ${Math.round(
    forecast[2].temp.min
  )}°</div>
      <div class="col-6" id="forecastIcon">
      <img
      src="http://openweathermap.org/img/wn/${forecast[2].weather[0].icon}.png"
      alt="Clear"
      id="futureIcon"
      class="float-right"
      />
      </div>`;

  forecastDay3.innerHTML = `
    <div class="col-6" id="forecastText">
    ${formatDay(forecast[3].dt)}
    <br />
    ${Math.round(forecast[3].temp.max)}° / ${Math.round(forecast[3].temp.min)}°
  </div>
      <div class="col-6" id="forecastIcon">
      <img
      src="http://openweathermap.org/img/wn/${forecast[3].weather[0].icon}.png"
      alt="Clear"
      id="futureIcon"
      class="float-right"
      />
      </div>`;

  forecastDay4.innerHTML = `
    <div class="col-6" id="forecastText">
    ${formatDay(forecast[4].dt)}
    <br />
    ${Math.round(forecast[4].temp.max)}° / ${Math.round(forecast[4].temp.min)}°
  </div>
      <div class="col-6" id="forecastIcon">
      <img
      src="http://openweathermap.org/img/wn/${forecast[4].weather[0].icon}.png"
      alt="Clear"
      id="futureIcon"
      class="float-right"
      />
      </div>`;

  forecastDay5.innerHTML = `
    <div class="col-6" id="forecastText">
    ${formatDay(forecast[5].dt)}
    <br />
    ${Math.round(forecast[5].temp.max)}° / ${Math.round(forecast[5].temp.min)}°
  </div>
      <div class="col-6" id="forecastIcon">
      <img
      src="http://openweathermap.org/img/wn/${forecast[5].weather[0].icon}.png"
      alt="Clear"
      id="futureIcon"
      class="float-right"
      />
      </div>`;
}

function getForecast(coordinates) {
  let apiKey = "2d226cd19a47dc1aded74f5d314dd190";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
