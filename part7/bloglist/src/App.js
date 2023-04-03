import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { initBlogs } from "./reducers/blogReducer"
import { initUser, logout } from "./reducers/userReducer"

import BlogList from "./components/BlogList"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
  }, [dispatch])

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification />

      {!user && (
        <Togglable buttonLabel="Login">
          <LoginForm />
        </Togglable>
      )}
      {user && (
        <div>
          <p>
            Logged in as {user.name}{" "}
            <button
              id="logout"
              type="submit"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </p>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      )}
      <br />
      <BlogList />
    </div>
  )
}

export default App
