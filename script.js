
const apiKey = 'efd1e306de5310f3e8d65aa980812bdc'; // Correct OpenWeatherMap API key

document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');
    weatherResult.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = data.main.temp.toFixed(1);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind-speed').textContent = windSpeed;

    // Set weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.src = iconUrl;
    weatherIcon.alt = data.weather[0].description;

    // Set humidity icon based on value
    const humidityIcon = document.getElementById('humidity-icon');
    if (humidity < 30) {
        humidityIcon.textContent = '💧'; // low humidity
    } else if (humidity < 60) {
        humidityIcon.textContent = '💦'; // medium humidity
    } else {
        humidityIcon.textContent = '🌊'; // high humidity
    }

    // Set wind speed icon based on value
    const windIcon = document.getElementById('wind-icon');
    if (windSpeed < 2) {
        windIcon.textContent = '🍃'; // low wind
    } else if (windSpeed < 5) {
        windIcon.textContent = '🌬️'; // medium wind
    } else {
        windIcon.textContent = '💨'; // high wind
    }

    weatherResult.classList.remove('hidden');
}
