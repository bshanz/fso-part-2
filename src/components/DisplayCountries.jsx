import { useState } from "react"
import CountryInfo from "./CountryInfo"
import SingleCountry from "./SingleCountry"

const DisplayCountries = ({countries}) => {
    const [selectedCountry, setSelectedCountry] = useState([])
    const [showSingleCountry, setShowSingleCountry] = useState(false)

    const handleShowCountryClick = (country) => {
        console.log(country)
        if (showSingleCountry){
            setSelectedCountry([])
            setShowSingleCountry(false)
            console.log("if")
        } else {
            setSelectedCountry(country)
            setShowSingleCountry(true)
        }
    }

    if(countries.length > 10) {
        return <p>Too many countries, search to shorten the list. When there are 10 or less, we'll display them.</p>
    } else if (showSingleCountry && selectedCountry){
        console.log("show single country")
        return (
            <SingleCountry country={selectedCountry} handleShowCountryClick={handleShowCountryClick} />
        )
    } else if (countries.length === 1) {
        return (
            <div>
                {countries.map(country =>               
                    <h2 key={country.id}>{country.name.common} {country.flag}</h2>                
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
                        <button onClick={() => handleShowCountryClick(country)}>
                            Show details
                        </button>
                    </li>                
                )}
            </div>
        )
    }
}

export default DisplayCountries
