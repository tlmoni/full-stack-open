const mongoose = require("mongoose")
const helper = require("./test_helper")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

// GET request related tests
describe("GET requests to Blogs API", () => {
  test("Blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("There are two blogs after GET request with test data", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("A blog has _id by default", async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })

  test("toJSON returns a blog object with id instead of _id", async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })
})

// POST request related tests
describe("POST requests to Blogs API", () => {
  test("A blog an be posted successfully", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    const titles = blogsAfterPost.map(blog => blog.title)

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain("Canonical string reduction")
  })

  test("If likes property is missing, it will default to 0", async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    const addedBlog = await blogsAfterPost.find(blog => blog.title === "First class tests")
    expect(addedBlog.likes).toBe(0)
  })

  test("If title and/or url are missing, received response is 400 Bad request", async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})