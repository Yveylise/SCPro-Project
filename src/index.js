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

// display day of week and user's local time.

currentMinute = formatMinutes();
let currentTime = `${currentHour}:${currentMinute}`;

let liDate = document.querySelector("li#date");
liDate.innerHTML = `${currentDay}, ${currentTime}`;

// --------------------------------------------

let tempElement = document.querySelector(".defaultTemp");

//Convert to Fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  temperature = tempElement.innerHTML;
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

//Convert to Celcius
function convertToCelsius(event) {
  event.preventDefault();
  temperature = tempElement.innerHTML;
  tempElement.innerHTML = Math.round((temperature - 32) * (5 / 9));
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// --------------USER SEARCH-------------------------
let userSearchForm = document.querySelector("#form");
userSearchForm.addEventListener("submit", userSearch);

function userSearch(event) {
  event.preventDefault();
  // function handleSearch() {
  let userCity = document.querySelector("#site-search");
  let userCityValue = userCity.value;
  //  console.log(`${userCityValue}`);
  let apiKey = "2d226cd19a47dc1aded74f5d314dd190";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCityValue}&appid=${apiKey}&units=imperial`;
  //  console.log(apiURL);
  axios.get(apiURL).then(displayWeather);
  //console.log(showUserSearchStats);
}

// Display Weather Info
function displayWeather(response) {
  //console.log(response);
  let localCityName = response.data.name;
  //  console.log(localCityName);
  let localTemperature = Math.round(response.data.main.temp);
  // console.log(localTemperature);
  let liCity = document.querySelector("li#city");
  liCity.innerHTML = `${localCityName}`;
  let liTemp = document.querySelector(".defaultTemp");
  liTemp.innerHTML = `${localTemperature}`;
}

// --------------CURRENT LOCATION-------------------------

function currentLocation(position) {
  //  console.log(position.coords.latitude);
  //  console.log(position.coords.longitude);
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

// Current Location Click >> get geo location >> grab coords to create API Link >> display local stats from API

// User Search Click >> grab user value to create API link >> display weather.
