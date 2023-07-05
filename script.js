const apiKey = 'fde0f37934884868bc890643232906';

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  const locationInput = document.getElementById('locationInput');
  const location = locationInput.value.trim();

  if (location !== '') {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=5`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayCurrentWeather(data.current);
        displayForecast(data.forecast.forecastday);
      })
      .catch(error => {
        console.error('Error:', error);
        displayErrorMessage('An error occurred while retrieving the weather data.');
      });
  }
}

function displayCurrentWeather(currentWeather) {
  const currentWeatherContainer = document.getElementById('currentWeather');

  currentWeatherContainer.innerHTML = '';

  const temperature = currentWeather.temp_c;
  const humidity = currentWeather.humidity;
  const windSpeed = currentWeather.wind_kph;
  const weatherDescription = currentWeather.condition.text;

  const weatherInfo = `
    <h2>Current Weather</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} km/h</p>
    <p>Description: ${weatherDescription}</p>
  `;

  currentWeatherContainer.innerHTML = weatherInfo;
}

function displayForecast(forecast) {
  const forecastContainer = document.getElementById('forecast');

  forecastContainer.innerHTML = '';

  let forecastInfo = '<h2>5-Day Forecast</h2>';

  forecast.forEach(day => {
    const date = day.date;
    const weatherCondition = day.day.condition.text;
    const maxTemp = day.day.maxtemp_c;
    const minTemp = day.day.mintemp_c;

    forecastInfo += `
      <div>
        <p>Date: ${date}</p>
        <p>Condition: ${weatherCondition}</p>
        <p>Max Temperature: ${maxTemp}°C</p>
        <p>Min Temperature: ${minTemp}°C</p>
      </div>
    `;
  });

  forecastContainer.innerHTML = forecastInfo;
}

