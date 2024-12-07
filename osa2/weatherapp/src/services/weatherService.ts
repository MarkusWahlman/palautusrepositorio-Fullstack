import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = (cityName: string) => {
  console.log("CITYNAME:", cityName);
  const request = axios.get(`${baseUrl}`, {
    params: {
      q: cityName,
      appid: API_KEY,
    },
  });
  return request.then((response) => response.data);
};

export default {
  get: getWeather,
};
