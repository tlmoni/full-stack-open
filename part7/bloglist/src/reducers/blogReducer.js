import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.post(blog)
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} added`,
          5
        )
      )
    } catch (exception) {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
      dispatch(setNotification(exception, 5))
    }
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1
      })
      dispatch(updateBlog(likedBlog))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification("Blog was already removed from server", 5))
      dispatch(removeBlog(blog.id))
    }
  }
}

export const remove = (blog) => {
  return async (dispatch) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog.id))
        dispatch(setNotification("Blog removed successfully", 5))
      }
    } catch (exception) {
      dispatch(setNotification(exception, 5))
    }
  }
}

export default blogSlice.reducer
