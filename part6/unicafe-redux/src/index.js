import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import counterReducer from "./reducer"

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <button onClick={() => store.dispatch({ type: "GOOD" })}>good</button>
      <button onClick={() => store.dispatch({ type: "OK" })}>neutral</button>
      <button onClick={() => store.dispatch({ type: "BAD" })}>bad</button>
      <button onClick={() => store.dispatch({ type: "ZERO" })}>reset stats</button>
      <p>good {store.getState().good}</p>
      <p>neutral {store.getState().ok}</p>
      <p>bad {store.getState().bad}</p>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />)
}

renderApp()
store.subscribe(renderApp)