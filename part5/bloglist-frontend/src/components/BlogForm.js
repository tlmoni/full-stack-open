import { useState } from "react"

const BlogForm = ({ addBlog }) => {
  const [title, setTitle ] = useState("")
  const [author, setAuthor ] = useState("")
  const [url, setUrl ] = useState("")

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const add = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={add}>
        <div>
          Title: <input
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author: <input
            id="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL: <input
            id="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm