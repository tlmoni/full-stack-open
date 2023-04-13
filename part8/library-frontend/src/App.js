import { useEffect, useState } from "react"
import { useApolloClient, useSubscription } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Recommendations from "./components/Recommendations"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import { ALL_BOOKS, BOOK_ADDED } from "./queries"

export const updateCache = (cache, query, bookAdded) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(bookAdded)),
    }
  })
}

const App = () => {
  const [notification, setNotification] = useState(null)
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"))
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      setError("A new book has been added")
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const setError = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  return (
    <div>
      <Notification message={notification} />
      <div>
        <button onClick={() => setPage("authors")}>
          authors
        </button>
        <button onClick={() => setPage("books")}>
          books
        </button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>
              add book
            </button>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
            <button onClick={logout}>
              logout
            </button>
          </>
        )}
        {!token &&
          <button onClick={() => setPage("login")}>login</button>
        }
      </div>
      <Authors show={page === "authors"} setError={setError} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={setError} setPage={setPage} />
      <Recommendations show={page === "recommendations"} setPage={setPage} />
      <LoginForm
        show={page === "login"}
        setError={setError}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
