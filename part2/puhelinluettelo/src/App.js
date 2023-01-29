import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchFilter, setSearchFilter] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const updateSearchFilter = (event) => setSearchFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        searchFilter={searchFilter}
        updateSearchFilter={updateSearchFilter}
      />
      <h2>Add a new contact</h2>
      <ContactForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Contacts</h2>
      <Contacts
        persons={persons}
        searchFilter={searchFilter}
      />
    </div>
  )

}

export default App