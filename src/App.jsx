import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'
import SearchForm from './components/SearchForm'
import AddPerson from './components/AddPerson'
import personsService from './services/persons/'

const App = () => {
 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [searchTerm, setSearchTerm] = useState('')
  

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
        console.log('updated data', updatedData)
        // After updating on the server, also update the local state
        const updatedPersonsList = persons.map(person => 
          person.id !== existingPerson.id ? person : updatedData
        );
        setPersons(updatedPersonsList);
      } catch (error) {
        console.error(error);
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
    } catch (error) {
      console.log(error)
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
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    } catch (error) {
      console.log(error)
    }
  }
}


  return (
    <div>
      <h2>Phonebook</h2>
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