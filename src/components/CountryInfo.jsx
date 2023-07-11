const CountryInfo = ({countries}) => {
    console.log('country info', countries)

    if (countries.length === 1) {
        return (
            <div>
                {countries.map(country => 
                    <div key={country.id}>
                        <li key={country.id + "-capital"}>Capital: {country.capital[0]}</li>
                        <li key={country.id + "-region"}>Region: {country.region}</li> 
                        <h3>Languages</h3>
                        <ul>
                            {Object.values(country.languages).map((language, index) => 
                                <li key={country.id + "-language-" + index}>{language}</li>
                            )}
                        </ul>
                        <h3>Weather</h3>
                    </div>              
                )}
            </div>
        )
    } 
}

export default CountryInfo
