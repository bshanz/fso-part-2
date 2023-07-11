const SearchCountries = ({ handleSearchChange }) => {

    return (
        <form>
            <input 
                type="text"
                placeholder="Search countries"
                onChange={handleSearchChange}
            />
        </form>
    )
}

export default SearchCountries
