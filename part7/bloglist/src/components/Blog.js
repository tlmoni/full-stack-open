import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Button, List, ListItem, TextField, Typography } from "@mui/material"
import CommentIcon from "@mui/icons-material/Comment"
import { like, remove, commentBlog } from "../reducers/blogReducer"
import { useField } from "../hooks"

const Blog = ({ blog }) => {
  const user = useSelector(({ user }) => user)
  const { reset: resetComment, ...comment } = useField("text")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment.value))
    resetComment()
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <Typography
        variant="h4"
        component="h1"
        style={{ paddingTop: 10, paddingBottom: 10 }}
      >
        {blog.title} by {blog.author}
      </Typography>
      <div>
        <Typography component={Link} to={blog.url}>
          {blog.url}
        </Typography>
        <Typography component="p" style={{ paddingTop: 10, paddingBottom: 10 }}>
          {blog.likes} likes{" "}
          <Button
            id="like-button"
            variant="contained"
            onClick={() => dispatch(like(blog))}
          >
            Like
          </Button>
        </Typography>
        <Typography component="p" style={{ paddingTop: 10, paddingBottom: 10 }}>
          Added by {blog.user.name}
        </Typography>
        {user && user.name === blog.user.name ? (
          <Button
            id="remove"
            variant="outlined"
            color="error"
            onClick={() => {
              dispatch(remove(blog))
              navigate("/")
            }}
          >
            Remove
          </Button>
        ) : null}
      </div>
      <Typography
        variant="h4"
        component="h3"
        style={{ paddingTop: 30, paddingBottom: 10 }}
      >
        Comments
      </Typography>
      <form onSubmit={addComment}>
        <TextField id="comment" label="Comment" {...comment} />
        <br />
        <Button id="add-comment" variant="contained" type="submit">
          Add comment
        </Button>
      </form>
      <List>
        {blog.comments.map((comment, i) => (
          <ListItem key={i + 1}>
            <CommentIcon sx={{ paddingRight: 3 }} />
            {comment}
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Blog
