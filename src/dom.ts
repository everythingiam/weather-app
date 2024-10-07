import { WeatherData } from './api';
import utils from './utils';

const mainTemp = document.querySelector('.temperature')!;
const locate = document.querySelector('.location .city')!;
const cloudiness = document.querySelector('.cloudiness')!;
const wind = document.querySelector('.wind')!;
const humidity = document.querySelector('.humidity')!;
const visibility = document.querySelector('.visibility')!;
const sunrise = document.querySelector('.sunrise')!;
const sunset = document.querySelector('.sunset')!;
const maxtemp = document.querySelector('.temperature-range .max')!;
const mintemp = document.querySelector('.temperature-range .min')!;
const feels = document.querySelector('.feels span')!;
const breeze = document.querySelector('.breeze')!;
const message = document.querySelector('.message')!;
const date = document.querySelector('.date')!;
const icon = document.querySelector('.svg-cont img')! as HTMLImageElement;

const allfells = document.querySelector('.feels-like')!;
const allTempRange = document.querySelector('.temperature-range')!;

function init(data: WeatherData): void {
  setDataOnDom(data);

  fahrenheitTab.addEventListener('click', () => {
    celsiusTab.classList.remove('active');
    fahrenheitTab.classList.add('active');
    hideElements();
    setTimeout(() => {
      showElements();
      setFahrenheit(data);
      setMiles(data);
    }, 500);
  });

  celsiusTab.addEventListener('click', () => {
    fahrenheitTab.classList.remove('active');
    celsiusTab.classList.add('active');
    hideElements();
    setTimeout(() => {
      showElements();
      setCelsius(data);
      setMeters(data);
    }, 500);
  });

  if (fahrenheitTab.classList.contains('active')) {
    setFahrenheit(data);
    setMiles(data);
  }

  setBreeze(data);
  showElements();
}

function setDataOnDom(data: WeatherData): void {
  mainTemp.textContent = `${utils.fahrenheitToCelsius(data.temp)}°`;
  locate.innerHTML = utils.formatAddress(data.address);
  cloudiness.textContent = `${utils.formatRound(data.cloudiness)}%`;
  wind.textContent = `${utils.formatRound(data.windspeed)}m/s`;
  humidity.textContent = `${utils.formatRound(data.humidity)}%`;
  visibility.textContent = `${utils.formatRound(data.visibility)}km`;
  sunrise.textContent = utils.formatTime(data.sunrise);
  sunset.textContent = utils.formatTime(data.sunset);
  maxtemp.textContent = utils.fahrenheitToCelsius(data.tempmax);
  mintemp.textContent = utils.fahrenheitToCelsius(data.tempmin);
  feels.textContent = utils.fahrenheitToCelsius(data.feelslike);
  message.textContent = data.message;
  date.textContent = utils.getCurrentTimeFormatted();
  icon.src = `./assets/icons/${data.icon}.svg`;
}

const fahrenheitTab = document.querySelector('.f')! as HTMLButtonElement;
const celsiusTab = document.querySelector('.c')! as HTMLButtonElement;

function setCelsius(data: WeatherData) {
  mainTemp.textContent = `${utils.fahrenheitToCelsius(data.temp)}°`;
  maxtemp.textContent = utils.fahrenheitToCelsius(data.tempmax);
  mintemp.textContent = utils.fahrenheitToCelsius(data.tempmin);
  feels.textContent = utils.fahrenheitToCelsius(data.feelslike);
}

function setFahrenheit(data: WeatherData) {
  mainTemp.textContent = `${utils.formatRound(data.temp)}°`;
  maxtemp.textContent = utils.formatRound(data.tempmax);
  mintemp.textContent = utils.formatRound(data.tempmin);
  feels.textContent = utils.formatRound(data.feelslike);
}

function setMiles(data: WeatherData) {
  wind.textContent = `${utils.metersPerSecondToMilesPerHour(
    data.windspeed
  )}mph`;
  visibility.textContent = `${utils.kmToMiles(data.visibility)}mi`;
}

function setMeters(data: WeatherData) {
  wind.textContent = `${utils.formatRound(data.windspeed)}m/s`;
  visibility.textContent = `${utils.formatRound(data.visibility)}km`;
}

function setBreeze(data: WeatherData): void {
  const breezeConditions: [number, string][] = [
    [0.5, 'Calm'],
    [1.6, 'Light air'],
    [3.4, 'Light breeze'],
    [5.6, 'Gentle breeze'],
    [8, 'Moderate breeze'],
    [10.8, 'Fresh breeze'],
    [13.9, 'Strong breeze'],
    [17.2, 'High wind'],
    [20.8, 'Gale'],
    [24.5, 'Strong gale'],
    [28.5, 'Storm'],
    [32.7, 'Violent storm'],
    [Infinity, 'Hurricane'],
  ];

  for (const [limit, description] of breezeConditions) {
    if (data.windspeed < limit) {
      breeze.textContent = description;
      break;
    }
  }
}

const elements_array = [
  mainTemp,
  locate,
  cloudiness,
  wind,
  humidity,
  visibility,
  sunrise,
  sunset,
  allTempRange,
  allfells,
  message,
  date,
  icon,
];

function showElements() {
  elements_array.forEach((elem) => {
    elem.classList.remove('hidden');
  });
}

function hideElements() {
  elements_array.forEach((elem) => {
    elem.classList.add('hidden');
  });
}

export default {
  setDataOnDom,
  setCelsius,
  init,
  hideElements,
};
