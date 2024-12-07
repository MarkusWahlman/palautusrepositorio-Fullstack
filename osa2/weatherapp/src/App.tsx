import { useState } from "react";
import { CountryObject } from "./types/Country";
import { FindCountries } from "./components/FindCountries";
import { ShowCountries } from "./components/ShowCountries";

function App() {
  const [foundCountries, setFoundCountries] = useState<CountryObject[] | null>(
    null
  );

  return (
    <div>
      <FindCountries setFoundCountries={setFoundCountries} />
      <ShowCountries foundCountries={foundCountries} />
    </div>
  );
}

export default App;
