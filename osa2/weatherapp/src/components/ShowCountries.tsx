import { useEffect, useState } from "react";
import { CountryObject } from "../types/Country";
import { ShowCountry } from "./ShowCountry";

type ShowCountriesProps = {
  foundCountries: CountryObject[] | null;
};

const ShowCountries = ({ foundCountries }: ShowCountriesProps) => {
  const [countries, setCountries] = useState(foundCountries);

  useEffect(() => {
    setCountries(foundCountries);
  }, [foundCountries]);

  if (countries == null) {
    return;
  }

  if (countries.length > 10) {
    return <p>Too many matches.</p>;
  }

  const handleShowCountry = (index: number) => {
    setCountries([countries[index]]);
  };

  if (countries.length == 1) {
    return <ShowCountry country={countries[0]} />;
  }

  return (
    <ul>
      {countries?.map((country, index) => {
        return (
          <li key={country.name.official}>
            {country.name.common}
            <button
              onClick={() => {
                handleShowCountry(index);
              }}
            >
              show
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export { ShowCountries };
