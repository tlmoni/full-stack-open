import { useState, useEffect } from 'react'

import personService from './services/persons'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contact from './components/Contact'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchFilter, setSearchFilter] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const updateSearchFilter = (event) => setSearchFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // Update existing number if name is already in persons
    if (persons.map(person => person.name).includes(personObject.name)) {
      if (
        window.confirm(
          `${personObject.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const id = (persons.find(person => person.name === personObject.name)).id
        personService
          .update(id, personObject)
          .then(returnedObject => {
            setPersons(
              persons.map(person =>
                person.id !== id ? person : returnedObject
              )
            )
            setNewName("")
            setNewNumber("")
          })
      }
    }
    // Add a new contact
    else {
      personService
        .add(personObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const deletePerson = (id) => {
    if (
      window.confirm(
        `Delete ${(persons.find(person => person.id === id)).name}?`
      )
    ) {
      personService.deleteContact(id)
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
      {persons
        .filter(person =>
          person.name.toLowerCase().startsWith(searchFilter.toLowerCase())
        )
        .map(person =>
          <Contact
            key={person.name}
            name={person.name}
            number={person.number}
            deleteContact={() => deletePerson(person.id)}
          />
      )}
    </div>
  )
}

export default App