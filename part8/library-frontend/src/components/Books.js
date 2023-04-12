import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE, ALL_GENRES } from "../queries"

const Books = ({ show }) => {
  const [filter, setFilter] = useState("")
  const resultBooks = useQuery(ALL_BOOKS)
  const resultGenres = useQuery(ALL_GENRES)
  const resultBooksByGenre = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: filter }
  })

  if (!show) {
    return null
  }
  if (resultBooks.loading || resultBooksByGenre.loading)  {
    return (
      <div>
        <h2>Books</h2>
        <div>
          loading...
        </div>
      </div>
    )
  }

  let books = resultBooks.data.allBooks
  if (filter !== "") {
    books = resultBooksByGenre.data.allBooks
  }
  const genres = resultGenres.data.allGenres

  return (
    <div>
      <h2>Books</h2>
      <div>
        {filter === "" && genres.map(genre => (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
        {filter !== "" && (
          <p>
            in genre <strong>{filter}</strong>{" "}
            <button key={"resetFilter"} onClick={() => setFilter("")}>
              reset filter
            </button>
          </p>
        )}
      </div>
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

export default Books
