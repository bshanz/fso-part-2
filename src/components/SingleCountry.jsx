const SingleCountry = ({country, handleShowCountryClick}) => {
    console.log('country info', country)

    return (
        <div key={country.id}>
            <h2>{country.name.common} {country.flag}</h2>
            <li key={country.id + "-capital"}>Capital: {country.capital[0]}</li>
            <li key={country.id + "-region"}>Region: {country.region}</li> 
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map((language, index) => 
                    <li key={country.id + "-language-" + index}>{language}</li>
                )}
            </ul>
            <h3>Weather</h3>
            <button onClick={handleShowCountryClick}>
                Hide info
            </button>
        </div> 
    )
}

export default SingleCountry
