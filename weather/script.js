// script.js

const apiKey = 'ddda69b3a46a8a5bc69ecf940a850017'; // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    document.getElementById('weather').innerHTML = 'Location not found.';
                }
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                document.getElementById('weather').innerHTML = 'Error fetching the weather data.';
            });
    } else {
        document.getElementById('weather').innerHTML = 'Please enter a location.';
    }
}

function displayWeather(data) {
    const weatherElement = document.getElementById('weather');
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherElement.innerHTML = `
        <p><strong>Location:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
}
