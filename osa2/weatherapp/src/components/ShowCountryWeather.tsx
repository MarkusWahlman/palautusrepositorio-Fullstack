import { useEffect, useState } from "react";
import { CountryObject } from "../types/Country";

import weatherService from "../services/weatherService";
import { WeatherObject } from "../types/Weather";
import { kelvinToCelsius } from "../utils/temp";

type ShowCountryWeatherProps = {
  country: CountryObject | null;
};

const ShowCountryWeather = ({ country }: ShowCountryWeatherProps) => {
  if (!country) {
    return null;
  }
  const [weather, setWeather] = useState<WeatherObject | null>(null);

  useEffect(() => {
    weatherService.get(country.capital[0]).then((response) => {
      setWeather(response);
    });
  }, []);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {country.name.common}</h2>
      <p>
        Temperature: {kelvinToCelsius(weather.main.temp).toFixed(2)} Celsius
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      ></img>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export { ShowCountryWeather };
