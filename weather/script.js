const apiKey = '5642832d0d9af397f350faf6bba63741';
const button = document.getElementById('button');
const input = document.getElementById('input');
const weather = document.getElementById('weather');
const loading = document.getElementById('loading'); 
function searchWeather() {
  const city = input.value.trim();
  if (city === '') {
    document.getElementById('error-trim').style.display = 'block';
    setTimeout(() => {
      document.getElementById('error-trim').style.display = 'none';
    }, 2000);
    return;
  }

  loading.style.display = 'block';

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`;

  fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      weather.innerHTML = `<p>${data.name}</p>
        <img id="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
        <p id="temperature">${Math.round(data.main.temp)}°C</p>

        <div class="info-box">
          <span class="info">رطوبت هوا<hr><span id="humidity"></span>${data.main.humidity}%</span>
          <span class="info">سرعت باد<hr><span id="wind"></span>${data.wind.speed}km/h</span>
        </div>`;
    })
    .catch(error => {
      document.getElementById('error').style.display = 'block';
      setTimeout(() => {
        document.getElementById('error').style.display = 'none';
      }, 2000);
    })
    .finally(() => {
      loading.style.display = 'none';
    });
}

button.addEventListener('click', searchWeather);

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchWeather();
  }
});
