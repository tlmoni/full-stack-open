import { useQuery  } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import EditBirthYear from "./EditBirthYear"

const Authors = ({ show, setError }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditBirthYear allAuthors={authors} setError={setError} />
    </div>
  )
}

export default Authors