import CountryInfo from "./CountryInfo"

const DisplayCountries = ({countries}) => {
    console.log(countries)
    console.log(countries.length)

    if(countries.length > 10) {
        return <p>Too many countries, search to shorten the list. When there are 10 or less, we'll display them.</p>
    } else if (countries.length === 1) {
        return (
            <div>
                {countries.map(country =>               
                    <h2>{country.name.common} {country.flag}</h2>                
                )}
                <CountryInfo countries={countries} />
            </div>
        )
    } else {
        return (
            <div>
                {countries.map(country =>               
                    <li key={country.id}>
                        {country.name.common}
                        <button>
                            Show details
                        </button>
                    </li>                
                )}
            </div>
        )
    }
}

export default DisplayCountries
