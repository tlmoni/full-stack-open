import { useDispatch } from "react-redux"
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
      <h2>Add new blog</h2>
      <form onSubmit={add}>
        <div>
          Title: <input id="title" {...title} />
        </div>
        <div>
          Author: <input id="author" {...author} />
        </div>
        <div>
          URL: <input id="url" {...url} />
        </div>
        <div>
          <button id="add-blog" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
