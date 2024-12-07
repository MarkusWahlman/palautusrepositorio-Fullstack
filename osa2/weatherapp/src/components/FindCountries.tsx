import React, { useEffect, useState } from "react";
import { CountryObject } from "../types/Country";
import countriesService from "../services/countriesService";

interface FindCountriesProps {
  setFoundCountries: React.Dispatch<
    React.SetStateAction<CountryObject[] | null>
  >;
}

const FindCountries = ({ setFoundCountries }: FindCountriesProps) => {
  const [allCountries, setAllCountries] = useState<CountryObject[] | null>(
    null
  );

  useEffect(() => {
    countriesService.getAll().then((response) => {
      setAllCountries(response);
    });
  }, []);

  if (!allCountries) {
    return null;
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!allCountries) {
      return;
    }
    const searchValue = event.target.value.toLowerCase();

    const exactMatch = allCountries.find(
      (country) => country.name.common.toLowerCase() === searchValue
    );
    if (exactMatch) {
      setFoundCountries([exactMatch]);
      return;
    }

    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue)
    );
    setFoundCountries(filtered);
  };

  return (
    <div>
      <label>Search countries </label>
      <input onChange={handleSearch} />
    </div>
  );
};

export { FindCountries };
