const SearchForm = ({handleSearch, searchTerm}) => {
    return (
        <form>
        <div>
          Search: <input 
          onChange={handleSearch}
          value={searchTerm}
          placeholder='Search for a person...'
          />
        </div>
        <div>debug: {searchTerm}</div>
      </form>
    )
   
}

export default SearchForm