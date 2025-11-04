import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const api_key = import.meta.env.VITE_OPEN_WEATHER_APIKEY;
const weatherURL = "https://api.openweathermap.org/data/2.5/weather";

const getAllCountries = () => {
  return axios.get(`${baseUrl}/all`).then((response) => {
    return response.data;
  });
};

const getWeather = (lat, lon) => {
  if (!api_key) {
    console.error("VITE_OPEN_WEATHER_APIKEY is missing!");
    return Promise.reject(new Error("Weather API key not configured."));
  }

  return axios
    .get(`${weatherURL}?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
    .then((response) => {
      console.log("response data ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      // Re-throw or handle error as needed
      throw error;
    });
};

export default { getAllCountries, getWeather };
