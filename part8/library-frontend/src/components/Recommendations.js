import { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { ME, ALL_BOOKS_BY_GENRE } from "../queries"

const Recommendations = ({ show }) => {
  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(ALL_BOOKS_BY_GENRE)
  const user = useQuery(ME)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [setBooks, result])

  useEffect(() => {
    if (user.data && user.data.me) {
      getBooks({ variables: { genre: user.data.me.favoriteGenre } })
    }
  }, [getBooks, user])

  if (!show) {
    return null
  }
  if (result.loading || user.loading)  {
    return (
      <div>
        <h2>Recommendations</h2>
        <div>
          loading...
        </div>
      </div>
    )
  }
  if (!user.data.me) {
    window.location.reload(false)
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <strong>{user.data.me.favoriteGenre}</strong></p>
      <table style={{ paddingTop: 10 }}>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations