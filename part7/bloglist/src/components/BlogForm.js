import { useDispatch } from "react-redux"
import { TextField, Button, Typography } from "@mui/material"
import { useField } from "../hooks"
import { createBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const { reset: resetTitle, ...title } = useField("text")
  const { reset: resetAuthor, ...author } = useField("text")
  const { reset: resetUrl, ...url } = useField("text")

  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value
      })
    )

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <Typography variant="h4" component="h2">
        Add new blog
      </Typography>
      <form onSubmit={add}>
        <div>
          <TextField id="title" label="Title" {...title} />
        </div>
        <div>
          <TextField id="author" label="Author" {...author} />
        </div>
        <div>
          <TextField id="url" label="URL" {...url} />
        </div>
        <div>
          <Button
            id="add-blog"
            variant="contained"
            color="primary"
            type="submit"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
