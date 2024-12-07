import { CountryObject } from "../types/Country";
import { ShowCountryWeather } from "./ShowCountryWeather";

type ShowCountryProps = {
  country: CountryObject | null;
};

const ShowCountry = ({ country }: ShowCountryProps) => {
  if (!country) {
    return null;
  }

  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.entries(country.languages).map(
            ([languageCode, languageName]) => (
              <li key={languageCode}>{languageName}</li>
            )
          )}
        </ul>
        <img
          src={country.flags.svg}
          alt={country.name.common}
          style={{ width: "200px" }}
        />
      </div>
      <ShowCountryWeather country={country} />
    </div>
  );
};

export { ShowCountry };
