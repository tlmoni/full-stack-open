import { useState, useEffect, useRef } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
    }
    catch (exception) {
      console.log(exception)
      setNotification("Wrong username or password")
      setTimeout(() => {
        setNotification("")
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      setUser(null)
    }
    catch (exception) {
      setNotification(exception)
      setTimeout(() => {
        setNotification("")
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.post(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotification(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setNotification("")
      }, 5000)
      blogFormRef.current.toggleVisibility()
    }
    catch(exception) {
      setBlogs(blogService.getAll())
      setNotification(exception)
      setTimeout(() => {
        setNotification("")
      }, 5000)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
    }
    catch(exception) {
      setNotification("Blog was already removed from server")
      setTimeout(() => {
        setNotification("")
      }, 5000)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}$?`)) {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setNotification("Blog removed successfully")
        setTimeout(() => {
          setNotification("")
        }, 5000)
      }
    }
    catch(exception) {
      setNotification(exception)
      setTimeout(() => {
        setNotification("")
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={notification} />

      {!user &&
        <Togglable buttonLabel="Login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>
            Logged in as {user.name} <button id="logout" type="submit" onClick={handleLogout}>
              Logout
            </button>
          </p>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </div>
      }
      <br/>
      {blogs
        .sort((blog1, blog2) => blog2.likes - blog1.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        )}
    </div>
  )
}

export default App