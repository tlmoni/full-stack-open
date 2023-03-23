import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === null) {
      return anecdotes
    }
    const regex = new RegExp( filter, "i" )
    return anecdotes.filter(anecdote => anecdote.content.match(regex))
  })

  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
  }

  const byVotes = (b1, b2) => b2.votes - b1.votes

  return(
    anecdotes.slice().sort(byVotes).map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => handleVote(anecdote)}
      />
    )
  )
}

export default AnecdoteList