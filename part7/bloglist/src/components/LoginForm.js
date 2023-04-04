import { useDispatch } from "react-redux"
import { TextField, Button } from "@mui/material"
import { useField } from "../hooks"
import { login } from "../reducers/authReducer"

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
          <TextField id="username" label="Username" {...username} />
        </div>
        <div>
          <TextField id="password" label="Password" {...password} />
        </div>
        <Button
          id="login-button"
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
