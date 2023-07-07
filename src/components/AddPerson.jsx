const AddPerson = ({addPerson, handlePersonChange,newName, handleNumberChange, newNumber }) => {
return (
    <form onSubmit={addPerson}>
    <div>
      name: <input 
      onChange={handlePersonChange}
      value={newName}
      placeholder='Add a new person...'
      />
    </div>
    <div>number: <input 
    onChange={handleNumberChange}
    value={newNumber}
    placeholder='Add a new number...'
    /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)
}

export default AddPerson