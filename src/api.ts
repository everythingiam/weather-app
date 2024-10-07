import utils from "./utils";

const key = utils.getKey(); 

export interface WeatherData {
  temp: number;
  tempmax: number;
  tempmin: number;
  sunrise: string;
  sunset: string;
  feelslike: number;
  windspeed: number;
  humidity: number;
  visibility: number;
  cloudiness: number;
  address: string;
  icon: string;
  date: number;
  message: string;
}

async function getAllDataFromCity(city: string) : Promise<void>{
  try {
    const key = await utils.getKey();
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`, {mode: 'cors'});
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Ошибка при фgетчинге к апишке:', error);
  }
}

async function getWeatherData(city: string) : Promise<WeatherData>{
    const key = await utils.getKey();
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`, {mode: 'cors'});
    const data = await response.json();

    return {
      temp: data.currentConditions.temp,
      tempmax: data.days[0].tempmax,
      tempmin: data.days[0].tempmin,
      sunrise: data.days[0].sunrise,
      sunset: data.days[0].sunset,
      feelslike: data.currentConditions.feelslike,
      windspeed: data.currentConditions.windspeed,
      humidity: data.days[0].humidity,
      visibility: data.currentConditions.visibility,
      message: data.days[0].conditions,
      cloudiness: data.days[0].cloudcover,
      address: data.resolvedAddress,
      icon: data.days[0].icon,
      date: Date.now(),
    };
}


export default {getAllDataFromCity, getWeatherData}; 
