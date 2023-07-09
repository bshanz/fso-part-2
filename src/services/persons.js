import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
    try {
      const response = await axios.get(baseUrl)
      return response.data
    } catch (error) {
      console.log(error)
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  const create = async (newPerson) =>{
    try {
        const response = await axios.post(baseUrl, newPerson)
        return response.data
    } catch (error) {
        console.log(error)
        throw error; // Re-throw the error to be caught by the caller
    }
  }

  const removePerson = async (id) =>{
    try {
        axios.delete(`${baseUrl}/${id}`)
        console.log('Item deleted successfully');
    } catch (error) {
        console.log('Error deleting item:', error);
        // Handle any error that occurred during deletion
    }
  }

  const updatePerson = async (id, updatedObject) => {
    try {
      const response = await axios.put(`http://localhost:3001/persons/${id}`, updatedObject);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

export default {getAll, create, removePerson, updatePerson}