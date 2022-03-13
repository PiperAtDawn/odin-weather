const form = document.querySelector('form');
const key = 'ff64559beb6298418d494172fc8bf63a';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  e.target.reset();
  handleWeather(city);
});

const getWeather = async (city) => {
  const call = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  const response = await fetch(call, { mode: 'cors'});
  const data = await response.json();
  return data;
};

const cityContainer = document.querySelector('#city-name');
const generalContainer = document.querySelector('#general');
const tempContainer = document.querySelector('#temperature');
const feelsLikeContainer = document.querySelector('#feels-like');
const windSpeedContainer = document.querySelector('#wind-speed');

const outputWeather = (name, general, temp, feelsLike, windSpeed) => {
  cityContainer.textContent = name;
  generalContainer.textContent = general;
  tempContainer.textContent = temp;
  feelsLikeContainer.textContent = feelsLike;
  windSpeedContainer.textContent = windSpeed;
};

const handleWeather = async (city) => {
  const data = await getWeather(city);
  console.log(data);
  outputWeather(
    city,
    data.weather[0].main,
    data.main.temp+' °F',
    data.main.feels_like+' °F',
    data.wind.speed+' mph'
  );
};

handleWeather('New York');