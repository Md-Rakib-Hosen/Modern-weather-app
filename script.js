const apiKey = '1e1c0acda41893bbfe3cda231deeec75'; // Replace with your real API key

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const weatherCard = document.getElementById('weatherCard');

  if (!city) {
    alert('Please enter a city name!');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCard.classList.remove('hidden');
      weatherCard.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${icon}" alt="Weather icon" />
        <p><strong>${data.weather[0].main}</strong> (${data.weather[0].description})</p>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
      `;
    } else {
      weatherCard.classList.remove('hidden');
      weatherCard.innerHTML = `<p>❌ City not found. Try again.</p>`;
    }
  } catch (error) {
    weatherCard.classList.remove('hidden');
    weatherCard.innerHTML = `<p>⚠️ Error fetching weather. Try again later.</p>`;
  }
}
