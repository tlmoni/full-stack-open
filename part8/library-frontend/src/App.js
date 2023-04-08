import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Notification from "./components/Notification"

const App = () => {
  const [page, setPage] = useState("authors")
  const [notification, setNotification] = useState(null)

  const setError = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <Notification message={notification} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Authors show={page === "authors"} setError={setError} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={setError} />
    </div>
  )
}

export default App
