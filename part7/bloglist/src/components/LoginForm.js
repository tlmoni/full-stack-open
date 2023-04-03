import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { login } from "../reducers/userReducer"

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField("text")
  const { reset: resetPassword, ...password } = useField("password")

  const dispatch = useDispatch()

  const submitLogin = (event) => {
    event.preventDefault()
    dispatch(login(username.value, password.value))
    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={submitLogin}>
        <div>
          Username: <input id="username" {...username} />
        </div>
        <div>
          Password: <input id="password" {...password} />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
