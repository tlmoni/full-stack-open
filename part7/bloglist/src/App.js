import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, useMatch } from "react-router-dom"
import { Container, Typography } from "@mui/material"

import { initUser } from "./reducers/authReducer"
import { initBlogs } from "./reducers/blogReducer"
import { initUsers } from "./reducers/userReducer"

import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import User from "./components/User"
import UserList from "./components/UserList"
import NavBar from "./components/NavBar"

const App = () => {
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initUsers())
    dispatch(initBlogs())
  }, [dispatch])

  const userMatch = useMatch("/users/:id")
  const matchedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch("/blogs/:id")
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <Container>
      <Notification />
      <NavBar />
      <Typography
        variant="h3"
        component="h1"
        style={{ paddingTop: 20, paddingBottom: 30 }}
      >
        <strong>
          Blogs app
        </strong>
      </Typography>
      {!user && (
        <Togglable buttonLabel="Login">
          <LoginForm />
        </Togglable>
      )}
      <Routes>
        <Route
          path="/"
          element={
            user === null ? (
              <>
                <br />
                <div>
                  <BlogList />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Togglable buttonLabel="New blog">
                    <BlogForm />
                  </Togglable>
                </div>
                <br />
                <div>
                  <BlogList />
                </div>
              </>
            )
          }
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
      </Routes>
    </Container>
  )
}

export default App
