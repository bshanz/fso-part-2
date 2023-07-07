import { useState } from 'react'
import Numbers from './components/Numbers'
import SearchForm from './components/SearchForm'
import AddPerson from './components/AddPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '201-245-8724' },{ name: 'Frank', number: '224-556-7843' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [searchTerm, setSearchTerm] = useState('')

  // handle form submit to add new person
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    // if the person already exists, throw error
    if (persons.some(person => person.name === personObject.name)){
      alert(`${personObject.name} already exists! Add a different person.`)
      setNewName('')
      return
    } 

    // add the new person and clear input
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <Numbers persons={filteredPersons} />
    </div>
  )
}

export default App