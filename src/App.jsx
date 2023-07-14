import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'
import SearchForm from './components/SearchForm'
import AddPerson from './components/AddPerson'
import personsService from './services/persons/'
import Notification from './components/Notification'
import Error from './components/Error'
import DisplayCountries from './components/DisplayCountries'
import SearchCountries from './components/SearchCountries'

console.log("phonebook")

const App = () => {

  // State for all countries
  const [countries, setCountries] = useState(null)
  // Search for countries
  const [searchTerm, setSearchTerm] = useState('');
  // Show the country's details
  const [showCountryDetails, setShowCountryDetails] = useState(false)

  // Handle the search for countries
  const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
  }

  const handleCountryDetails = () =>{
   
    setShowCountryDetails(!showCountryDetails)
  }

  // Fetch all countries
  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      
      setCountries(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

      // Filter countries based on searchTerm
  let filteredCountries = null;
  if (countries) {
    filteredCountries = countries.filter(country => {
      if (country && country.name.common) {
        return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        console.error("A country object was undefined or didn't have a name property.");
        return false;
      }
    });
  }


  if (!countries){
    return null
  }

  return (
    <div>
      <h2>Countries</h2>
      <SearchCountries handleSearchChange={handleSearchChange}/>
      <DisplayCountries countries={filteredCountries} showCountryDetails={showCountryDetails} handleCountryDetails={handleCountryDetails}/>
    </div>
  )
}

export default App