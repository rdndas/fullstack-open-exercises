const Search = ({ value, valueChange, isLoading }) => {
  return (
    <>
      find countries 
      <input
        id="search-country"
        placeholder="Search for a country"
        value={value}
        onChange={valueChange}
        disabled={isLoading}
      ></input>
    </>
  );
};

export default Search;
