import { useState, useEffect } from "react";
import Search from "./components/Search";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import getdata from "./services/getdata";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getdata
      .getAllCountries()
      .then((countries) => {
        setAllCountries(countries);
      })
      .catch((err) => {
        console.error("Error fetching all countries: ", err);
        setError("Could not fetch all countries");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log(allCountries);

  useEffect(() => {
    setSelectedCountry(null);
    setError(null);
    if (searchQuery.trim() === "") {
      setFilteredCountries([]);
      return;
    }
    const matches = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery)
    );

    setFilteredCountries(matches);

    if (matches.length === 1) {
      setSelectedCountry(matches[0]);
      console.log(selectedCountry);
    }
    matches.forEach((country) => {
      console.log(country.name.common);
    });
  }, [searchQuery, allCountries]);

  const handleSearchQuery = (event) => {
    if (isLoading) {
      return;
    }
    setSearchQuery(event.target.value);
  };

  const showCountry = (countryObject) => {
    console.log(countryObject)
    setSelectedCountry(countryObject)
  };

  const contentToDisplay = () => {
    if (isLoading) {
      return <p>Loading all country data from the server...</p>;
    }

    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} />;
    }
    return (
      <CountriesList
        filteredCountries={filteredCountries}
        searchQuery={searchQuery}
        error={error}
        showCountry={showCountry}
      />
    );
  };

  return (
    <>
      <Search
        value={searchQuery}
        valueChange={handleSearchQuery}
        isLoading={isLoading}
      />
      {contentToDisplay()}
    </>
  );
};

export default App;
