import { WeatherData } from './api';
import utils from './utils';

const mainTemp = document.querySelector('.temperature span')!;
const locate = document.querySelector('.location .city')!;
const cloudiness = document.querySelector('.cloudiness')!;
const wind = document.querySelector('.wind')!;
const humidity = document.querySelector('.humidity')!;
const rain = document.querySelector('.rain')!;
const sunrise = document.querySelector('.sunrise')!;
const sunset = document.querySelector('.sunset')!;
const maxtemp = document.querySelector('.temperature-range .max')!;
const mintemp = document.querySelector('.temperature-range .min')!;
const feels = document.querySelector('.feels-like span')!;
const message = document.querySelector('.message')!;
const date = document.querySelector('.date')!;

function init(data: WeatherData): void {
  setDataOnDom(data);

  fahrenheitTab.addEventListener('click', () => {
    celsiusTab.classList.remove('active');
    fahrenheitTab.classList.add('active');
    setFahrenheit(data);
    setMetersToMiles(data);
  });

  celsiusTab.addEventListener('click', () => {
    fahrenheitTab.classList.remove('active');
    celsiusTab.classList.add('active');
    setCelsius(data);
    setMilesToMeters(data);
  });

  if (fahrenheitTab.classList.contains('active')) {
    setFahrenheit(data);
    setMetersToMiles(data);
  }
}

function setDataOnDom(data: WeatherData): void {
  mainTemp.textContent = utils.fahrenheitToCelsius(data.temp);
  locate.innerHTML = utils.formatAddress(data.address);
  cloudiness.textContent = `${utils.formatRound(data.cloudiness)}%`;
  wind.textContent = `${utils.formatRound(data.windspeed)}m/s`;
  humidity.textContent = `${utils.formatRound(data.humidity)}%`;
  rain.textContent = `${utils.formatRound(data.humidity)}%`;
  sunrise.textContent = utils.formatTime(data.sunrise);
  sunset.textContent = utils.formatTime(data.sunset);
  maxtemp.textContent = utils.fahrenheitToCelsius(data.tempmax);
  mintemp.textContent = utils.fahrenheitToCelsius(data.tempmin);
  feels.textContent = utils.fahrenheitToCelsius(data.feelslike);
  message.textContent = data.message;
  date.textContent = utils.getCurrentTimeFormatted();
}

const fahrenheitTab = document.querySelector('.f')! as HTMLButtonElement;
const celsiusTab = document.querySelector('.c')! as HTMLButtonElement;

function setCelsius(data: WeatherData) {
  mainTemp.textContent = utils.fahrenheitToCelsius(data.temp);
  maxtemp.textContent = utils.fahrenheitToCelsius(data.tempmax);
  mintemp.textContent = utils.fahrenheitToCelsius(data.tempmin);
  feels.textContent = utils.fahrenheitToCelsius(data.feelslike);
}

function setFahrenheit(data: WeatherData) {
  mainTemp.textContent = utils.formatRound(data.temp);
  maxtemp.textContent = utils.formatRound(data.tempmax);
  mintemp.textContent = utils.formatRound(data.tempmin);
  feels.textContent = utils.formatRound(data.feelslike);
}

function setMetersToMiles(data: WeatherData) {
  wind.textContent = `${utils.metersPerSecondToMilesPerHour(
    data.windspeed
  )}mph`;
}

function setMilesToMeters(data: WeatherData) {
  wind.textContent = `${utils.formatRound(data.windspeed)}m/s`;
}

export default {
  setDataOnDom,
  setCelsius,
  init,
};
