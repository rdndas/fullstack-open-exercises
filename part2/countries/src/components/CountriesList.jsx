const CountriesList = ({ filteredCountries, searchQuery, error,showCountry }) => {

  if (error) {
    return <div>**Error:** {error}</div>;
  }

  if (searchQuery.trim() === '') {
    return <div></div>;
  }

  if (filteredCountries.length > 0 && filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map(country => (
          <li key={country.cca2}>
            {country.name.common} <button onClick={()=>showCountry(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  } else if (filteredCountries.length > 10) {
    return <div>Too many matches ({filteredCountries.length}), specify another filter.</div>;
  }
  else if (searchQuery.trim() !== '' && filteredCountries.length === 0 && !error) {
    return <div>No countries found matching that query.</div>;
  }
};

export default CountriesList;