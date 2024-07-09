// script.js
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('location');
    const locationName = document.getElementById('location-name');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');
    const additionalInfo = document.getElementById('additional-info');
    const errorMessage = document.getElementById('error-message');

    searchBtn.addEventListener('click', function() {
        const location = locationInput.value;
        if (location) {
            getWeatherData(location);
        } else {
            displayError('Please enter a location.');
        }
    });

    async function getWeatherData(location) {
        const apiKey = '1ba3e77524e8f5b7e10e8ada1e8daae8';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                updateUI(data);
            } else {
                displayError(data.message);
            }
        } catch (error) {
            displayError('Unable to retrieve weather data. Please try again later.');
        }
    }

    function updateUI(data) {
        errorMessage.textContent = ''; // Clear any existing error messages

        locationName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        const iconClass = getWeatherIconClass(iconCode);
        weatherIcon.innerHTML = `<i class="wi ${iconClass}"></i>`;

        additionalInfo.innerHTML = `
            <div>Humidity: ${data.main.humidity}%</div>
            <div>Wind Speed: ${data.wind.speed} m/s</div>
        `;

        document.querySelector('.weather-info').style.display = 'block';
    }

    function getWeatherIconClass(iconCode) {
        const iconMap = {
            '01d': 'wi-day-sunny',
            '01n': 'wi-night-clear',
            '02d': 'wi-day-cloudy',
            '02n': 'wi-night-alt-cloudy',
            '03d': 'wi-cloud',
            '03n': 'wi-cloud',
            '04d': 'wi-cloudy',
            '04n': 'wi-cloudy',
            '09d': 'wi-showers',
            '09n': 'wi-showers',
            '10d': 'wi-day-rain',
            '10n': 'wi-night-rain',
            '11d': 'wi-thunderstorm',
            '11n': 'wi-thunderstorm',
            '13d': 'wi-snow',
            '13n': 'wi-snow',
            '50d': 'wi-fog',
            '50n': 'wi-fog'
        };
        return iconMap[iconCode] || 'wi-na';
    }

    function displayError(message) {
        errorMessage.textContent = message;
        document.querySelector('.weather-info').style.display = 'none';
    }
});
