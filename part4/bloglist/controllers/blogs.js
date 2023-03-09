const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const { userExtractor } = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = await User.findById(request.user.id)
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id
  })

  let savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  savedBlog = await Blog
    .findById(savedBlog._id)
    .populate("user", { username: 1, name: 1 })

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = await User.findById(request.user.id)
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: "Unauthorized" })
  }
})

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const user = request.user
  const blogToUpdate = await Blog.findById(request.params.id)

  if (blogToUpdate.user.toString() === user.id.toString()) {
    const blog = {
      title: title,
      author: author,
      url: url,
      likes: likes || 0
    }
    let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    updatedBlog = await Blog
      .findById(updatedBlog._id)
      .populate("user", { username: 1, name: 1 })

    response.json(updatedBlog)
  }
  else {
    return response.status(401).json({ error: "Unauthorized" })
  }
})

module.exports = blogsRouter