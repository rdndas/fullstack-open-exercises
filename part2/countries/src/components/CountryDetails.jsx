const CountryDetails = ({ country }) => {
    if(!country){
        return <div></div>
    }
  console.log(country);
  const { name={}, flags={}, capital=[], languages=[], area=0 } = country;
  
  const languageList = Object.values(languages);
  return (
    <>
      <h1>{name.common}</h1>
      <p>Capital: {capital[0]}</p>
      <p>Area: {area}</p>
      <h2>Languages</h2>
      <ul>
      {/* The map() method creates a new array of <li> elements */}
      {languageList.map((language, index) => (
        <li key={index}>
          {language}
        </li>
      ))}
    </ul>
    <img 
        src={flags.svg} 
        alt={flags.alt}
      />
    </>
  );
};

export default CountryDetails;
