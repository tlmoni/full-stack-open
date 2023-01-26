import { useState } from 'react'

import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchFilter, setSearchFilter] = useState("")

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