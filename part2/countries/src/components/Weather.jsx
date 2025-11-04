const Weather = ({ weatherData }) => {
  //   const conditionURL = props.conditionURL;
  //   const temperature = props.temperature;
  //   const windSpeed = props.windSpeed;
  //   const capitalCity = props.capitalCity;

  const { conditionURL, temperature, windSpeed, capitalCity } = weatherData;

  return (
    <>
      <h1>Weather in {capitalCity}</h1>
      <p>Temperature {temperature} Celcius</p>
      <p>
        <img src={conditionURL} />{" "}
      </p>
      <p>Wind: {windSpeed} m/s</p>
    </>
  );
};
export default Weather;
