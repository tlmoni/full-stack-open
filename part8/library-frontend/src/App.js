import { useEffect, useState } from "react"
import { useApolloClient } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Recommendations from "./components/Recommendations"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"

const App = () => {
  const [notification, setNotification] = useState(null)
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token"))
  }, [])

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
