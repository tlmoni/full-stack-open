const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes, userId } = request.body
  const user = await User.findById(userId)
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.notes = user.notes.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(result)
})

module.exports = blogsRouter