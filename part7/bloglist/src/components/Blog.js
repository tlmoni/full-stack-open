import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"

import { like, remove } from "../reducers/blogReducer"

const Blog = ({ blog }) => {
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const showIfVisible = { display: visible ? "" : "none" }
  const buttonLabel = visible ? "Hide" : "View"

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5
  }

  const buttonStyle = {
    backgroundColor: "darkgrey",
    borderRadius: 3
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = () => {
    dispatch(like(blog))
  }

  const removeBlog = () => {
    dispatch(remove(blog))
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showIfVisible}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes{" "}
          <button id="like-button" onClick={incrementLikes}>
            Like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {user && user.name === blog.user.name ? (
          <button id="remove" onClick={removeBlog} style={buttonStyle}>
            Remove
          </button>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
