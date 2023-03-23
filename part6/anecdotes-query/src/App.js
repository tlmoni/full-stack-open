import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAnecdotes, createAnecdote, updateAnecdote } from "./requests"
import { useNotificationDispatch } from "./NotificationContext"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const setNotification = (message) => {
    dispatch({ type: "SET", payload: message })
    setTimeout(() => {
      dispatch({ type: "SET", payload: null })
    }, 5000)
  }

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote))
    },
    onError: () => setNotification("too short anecdote, must have length of 5 or more")
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    const newAnecdote = {
      content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0
    }
    newAnecdoteMutation.mutate(newAnecdote)
    setNotification(`anecdote ${content} added`)
  }

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const vote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    setNotification(`anecdote ${anecdote.content} voted`)
  }

  const result = useQuery(
    "anecdotes", getAnecdotes,
    {
      refetchOnWindowFocus: false,
      retry: 1
    }
  )

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
