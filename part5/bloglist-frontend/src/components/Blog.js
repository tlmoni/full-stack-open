import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  }

  const buttonStyle = {
    backgroundColor: "darkgrey",
    borderRadius: 3
  }

  const showIfVisible = { display: visible ? "" : "none" }
  const buttonLabel = visible ? "Hide" : "View"

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    updateBlog(updatedBlog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showIfVisible}>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes <button id="like-button" onClick={incrementLikes}>Like</button></p>
        <p>{blog.user.name}</p>
        {user && user.name === blog.user.name
          ? <button id="remove" onClick={remove} style={buttonStyle}>Remove</button>
          : null
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog