import { useState, useEffect } from "react";
import Search from "./components/Search";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import Weather from "./components/Weather";
import getdata from "./services/getdata";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [latLong, setLatLong] = useState([]);
  const [weather, setWeather] = useState();

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
      setLatLong(matches[0].latlng);
      console.log(selectedCountry);
      console.log(latLong);
    }
    matches.forEach((country) => {
      console.log(country.name.common);
    });
  }, [searchQuery, allCountries]);

  useEffect(() => {
    // Only fetch weather if a country is selected AND we have coordinates
    if (selectedCountry && latLong.length === 2) {
      const [lat, lng] = latLong;

      getdata
        .getWeather(lat, lng)
        .then((weatherResponse) => {
          // Check for valid response structure
          if (
            weatherResponse &&
            weatherResponse.main &&
            weatherResponse.wind &&
            weatherResponse.weather
          ) {
            const temperature = weatherResponse.main.temp;
            const windSpeed = weatherResponse.wind.speed;
            const iconCode = weatherResponse.weather[0].icon; // Use weather[0].icon
            const conditionURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const weatherCondition = {
              temperature,
              windSpeed,
              conditionURL,
              capitalCity: selectedCountry.capital[0],
            };
            setWeather(weatherCondition);
          } else {
            setWeather({ error: "Invalid weather data format received." });
          }
        })
        .catch((error) => {
          console.error("Failed to fetch weather:", error);
          setWeather({ error: "Could not fetch weather data." });
        });
    } else {
      setWeather(null);
    }
  }, [selectedCountry, latLong]);

  const handleSearchQuery = (event) => {
    if (isLoading) {
      return;
    }
    setSearchQuery(event.target.value);
  };

  const showCountry = (countryObject) => {
    setSelectedCountry(countryObject);
    setLatLong(countryObject.latlng);
  };

  const contentToDisplay = () => {
    if (isLoading) {
      return <p>Loading all country data from the server...</p>;
    }

    if (selectedCountry) {
      return (
        <>
          <CountryDetails country={selectedCountry} />
          {weather ? (
            <Weather weatherData={weather} />
          ) : (
            <p>Loading weather...</p>
          )}
        </>
      );
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
