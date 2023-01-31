import { useState, useEffect } from 'react'

import Contact from './components/Contact'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchFilter, setSearchFilter] = useState("")
  const [notification, setNotification] = useState(null)

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
            setNotification(
              `${personObject.name}'s number updated successfully`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification(
              `Information of ${personObject.name} has already been removed from the server`
            )
            setTimeout(() => {
              setNotification(null)
            }, 5000)
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
          setNotification(
            `${personObject.name} added successfully`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const name = (persons.find(person => person.id === id)).name
    if (
      window.confirm(
        `Delete ${name}?`
      )
    ) {
      personService.deleteContact(id)
      setNotification(
        `${name} deleted successfully`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification}/>
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