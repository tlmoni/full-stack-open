import { useState, useEffect } from "react"
import Select from "react-select"
import { useMutation } from "@apollo/client"
import { EDIT_BIRTH_YEAR, ALL_AUTHORS } from "../queries"

const EditBirthYear = ({ allAuthors, setError }) => {
  const [nameOptions, setNameOptions] = useState(null)
  const [setBornTo, setBornYear] = useState("")
  const [editBornYear, result] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  })

  const options = []
  allAuthors.forEach(author => options.push(
    {
      value: author.name,
      label: author.name
    }
  ))

  const submit = (event) => {
    event.preventDefault()
    editBornYear({ variables:
      { name: nameOptions.value, setBornTo: Number(setBornTo) }
    })
    setNameOptions("")
    setBornYear("")
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("Author not found")
    }
  }, [result.data])  // eslint-disable-line

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={nameOptions}
            onChange={setNameOptions}
            options={options}
          />
        </div>
        <div>
          born <input
            value={setBornTo}
            onChange={({ target }) => setBornYear(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditBirthYear