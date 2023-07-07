// import { useState } from 'react'
// import Note from './components/Note'


// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes)
//   const [newNote, setNewNote] = useState()

//   const [showAll, setShowAll] = useState(true)


//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: notes.length + 1,
//     }
  
//     setNotes(notes.concat(noteObject))
//     setNewNote('')
//   }

//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//       <input 
//       value={newNote} 
//       onChange={handleNoteChange}
//       placeholder='a new note...'
//       />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   )
// }

// export default App 

import { useState } from 'react'

const Numbers = ({persons}) =>{
  return (
    <ul>
      {persons.map(person => <li key={person.name}>{person.name}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },{ name: 'Frank' }
  ]) 
  const [newName, setNewName] = useState('')

  // handle form submit to add new person
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
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
  }

  // handle input in form
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          onChange={handlePersonChange}
          value={newName}
          placeholder='Add a new person...'
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      ...
      <Numbers persons={persons} />
    </div>
  )
}

export default App