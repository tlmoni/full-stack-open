const mongoose = require("mongoose")
const helper = require("./test_helper")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

// GET request related tests
describe("GET requests to Blogs API", () => {
  let headers

  beforeEach(async () => {
    const user = {
      username: "root",
      name: "root",
      password: "password",
    }

    await api
      .post("/api/users")
      .send(user)

    const result = await api
      .post("/api/login")
      .send(user)

    headers = {
      "Authorization": `Bearer ${result.body.token}`
    }
  })

  test("Blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .set(headers)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("All blogs are returned by GET request with test data", async () => {
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
  let headers

  beforeEach(async () => {
    const user = {
      username: "root",
      name: "root",
      password: "password",
    }

    await api
      .post("/api/users")
      .send(user)

    const result = await api
      .post("/api/login")
      .send(user)

    headers = {
      "Authorization": `Bearer ${result.body.token}`
    }
  })

  test("A blog can be posted successfully", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogs = await helper.blogsInDb()
    const titles = blogs.map(blog => blog.title)

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
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
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogs = await helper.blogsInDb()
    const addedBlog = await blogs.find(blog => blog.title === "First class tests")
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
      .set(headers)
      .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

// DELETE request related tests
describe("DELETE requests to Blogs API", () => {
  let headers

  beforeEach(async () => {
    const user = {
      username: "root",
      name: "root",
      password: "password",
    }

    await api
      .post("/api/users")
      .send(user)

    const result = await api
      .post("/api/login")
      .send(user)

    headers = {
      "Authorization": `Bearer ${result.body.token}`
    }
  })

  test("A blog can be deleted successfully", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    let blogs = await helper.blogsInDb()
    const blogToDelete = blogs.find(blog => blog.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(204)

    blogs = await helper.blogsInDb()
    const titles = blogs.map(blog => blog.title)

    expect(blogs).toHaveLength(helper.initialBlogs.length)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

// PUT request related tests
describe("PUT requests to Blogs API", () => {
  let headers

  beforeEach(async () => {
    const user = {
      username: "root",
      name: "root",
      password: "password",
    }

    await api
      .post("/api/users")
      .send(user)

    const result = await api
      .post("/api/login")
      .send(user)

    headers = {
      "Authorization": `Bearer ${result.body.token}`
    }
  })

  test("A blog can be updated successfully", async () => {
    const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    let blogs = await helper.blogsInDb()
    const blogToUpdate = blogs.find(blog => blog.title === newBlog.title)
    let updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .set(headers)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    blogs = await helper.blogsInDb()
    updatedBlog = blogs.find(blog => blog.likes === 13)
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(updatedBlog.likes).toBe(13)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})