import Contact from "./Contact"

const Contacts = ({ persons, searchFilter }) => {
  return (
    <>
      {persons
        .filter(person =>
          person.name.toLowerCase().startsWith(searchFilter.toLowerCase())
        )
        .map(person =>
        <Contact
          key={person.name}
          name={person.name}
          number={person.number}
        />
      )}
    </>
  )
}

export default Contacts