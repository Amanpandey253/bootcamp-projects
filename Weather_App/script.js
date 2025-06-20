// Get elements
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const weatherIcon = document.getElementById('weatherIcon');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const errorMsg = document.getElementById('errorMsg');

// Replace with your OpenWeatherMap API key
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"

// Add click event listener to the search button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === '') {
    showError('Please enter a city name.');
    return;
  }
  fetchWeather(city);
});

// Function to fetch weather data from API
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();

    // Update DOM with weather data
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Condition: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    // Set weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Show result and hide error
    weatherResult.style.display = 'flex';
    errorMsg.textContent = '';

  } catch (error) {
    showError('Unable to get weather. Please check the city name.');
  }
}

// Function to show error messages
function showError(message) {
  weatherResult.style.display = 'none';
  errorMsg.textContent = message;
}

// Allow pressing Enter key to search
cityInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchBtn.click();
  }
});
