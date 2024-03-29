import { useState } from "react"
import {
  Routes,
  Route,
  useMatch
} from "react-router-dom"

import About from "./components/About"
import Anecdote from "./components/Anecdote"
import AnecdoteList from "./components/AnecdoteList"
import CreateNew from "./components/CreateNew"
import Footer from "./components/Footer"
import Menu from "./components/Menu"
import Notification from "./components/Notification"

const App = () => {
  const [notification, setNotification] = useState(null)
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2
    }
  ])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`"${anecdote.content}" created successfully!`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const match = useMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route
          path="/"
          element={<div>
            <Notification notification={notification} />
            <AnecdoteList anecdotes={anecdotes} />
          </div>}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/create"
          element={<CreateNew addNew={addNew} />}
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
