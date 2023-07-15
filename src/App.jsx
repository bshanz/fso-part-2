import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'
import SearchForm from './components/SearchForm'
import AddPerson from './components/AddPerson'
import personsService from './services/persons/'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  

  const addPerson = async (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

     // if the person already exists, update their number
  const existingPerson = persons.find(person => person.name === personObject.name);

  if (existingPerson) {
    if (window.confirm(`${existingPerson.name} already exists, want to update their number?`)){

      const updatedPerson = { ...existingPerson, number: personObject.number };
      try {
        const updatedData = await personsService.updatePerson(existingPerson.id, updatedPerson);
        // After updating on the server, also update the local state
        const updatedPersonsList = persons.map(person => 
          person.id !== existingPerson.id ? person : updatedData
        );
        setPersons(updatedPersonsList);
      
        setMessage(
          `${updatedPerson.name}'s number was successfully updated!`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      } catch (error) {
        console.error(error);
        console.log("BIG ERROR HERE")
        setErrorMessage(
          `Error: ${existingPerson.name} was already removed from the server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

         // Remove the person from local state as well
          const updatedPersonsList = persons.filter(person => 
            person.id !== existingPerson.id
          );
          setPersons(updatedPersonsList);
      }
      
      return;
    }
    }
    
  
  // if not, add the new person
    try {
      
      const newPerson = await personsService.create(personObject)
      console.log(newPerson); // Response data from the server
      console.log('Data added successfully');

      // add the new person and clear input
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')

      setMessage(
        `Note '${newPerson.name}' was successfully added!`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (error) {
      console.log(error)
      console.error(error);
        setErrorMessage(
          `Already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  
  }

  // handle input in form
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  // Filter persons based on searchTerm
const filteredPersons = persons.filter(person => {
  if (person && person.name) {
    return person.name.toLowerCase().includes(searchTerm.toLowerCase());
  } else {
    console.error("A person object was undefined or didn't have a name property.");
    return false;
  }
});


// Getting data from JSON server with try/catch
useEffect(() => {
  const fetchPersons = async () => {
    try {
      const initialPersons = await personsService.getAll()
      setPersons(initialPersons)

    } catch (error) {
      console.log(error)
    }
  }
  fetchPersons()
  
}, [])

const handleDelete = async (id) => {
  const personToBeDeleted = persons.find(person => person.id === id)
  if(window.confirm(`Delete ${personToBeDeleted.name}?`)) {
    try {
      await personsService.removePerson(id)

      const updatedPeople = persons.filter(person => person.id !== id)

      setPersons(updatedPeople)

      setMessage(
        `${personToBeDeleted.name} was successfully deleted!`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (error) {
      console.log(error)

      setErrorMessage(
        `${personToBeDeleted.name} was already removed from the server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
}


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Error errorMessage={errorMessage}/>
      <SearchForm handleSearch={handleSearch} searchTerm={searchTerm}/>
      <h3>Add new</h3>
      <AddPerson 
      handlePersonChange={handlePersonChange} 
      handleNumberChange={handleNumberChange}
      addPerson={addPerson}
      newName={newName}
      newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App