const listHelper = require("../utils/list_helper")

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

// Test total likes
describe("Total likes", () => {
  test("Total likes of an empty list should be 0", () => {
    const resultEmptyBlogList = listHelper.totalLikes([])
    expect(resultEmptyBlogList).toBe(0)
  })

  test("When list has only one blog, result is the number of likes of that blog", () => {
    const resultOneBlogInList = listHelper.totalLikes([blogs[0]])
    expect(resultOneBlogInList).toBe(blogs[0].likes)
  })

  test("Amount of total likes of the whole list is calculated correctly", () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

// Test favorite blog
describe("Favorite blog", () => {
  test("Favorite blog of an empty list is {}", () => {
    const resultEmptyBlogList = listHelper.favoriteBlog([])
    expect(resultEmptyBlogList).toEqual({})
  })

  test("Favorite blog of a list with only one blog is that blog", () => {
    const favoriteBlog = listHelper.favoriteBlog([blogs[0]])
    expect(favoriteBlog).toEqual(blogs[0])
  })

  test("Favorite blog of the whole list is calculated correctly", () => {
    const favoriteBlog = listHelper.favoriteBlog(blogs)
    expect(favoriteBlog).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

// Test most blogs
describe("Most blogs", () => {
  test("Most blogs of an empty list is {}", () => {
    const resultEmptyBlogList = listHelper.mostBlogs([])
    expect(resultEmptyBlogList).toEqual({})
  })

  test("Author with most blogs of a list with only one blog is that author", () => {
    const mostBlogs = listHelper.mostBlogs([blogs[0]])
    expect(mostBlogs).toEqual({
      author: blogs[0].author,
      blogs: 1
    })
  })

  test("Author with most blogs of the whole list is determined correctly", () => {
    const mostBlogs = listHelper.mostBlogs(blogs)
    expect(mostBlogs).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

// Test most likes
describe("Most likes", () => {
  test("Most likes of an empty list is {}", () => {
    const resultEmptyBlogList = listHelper.mostLikes([])
    expect(resultEmptyBlogList).toEqual({})
  })

  test("Author with most likes of a list with only one blog is that author with that blog's number of likes", () => {
    const mostLikes = listHelper.mostLikes([blogs[0]])
    expect(mostLikes).toEqual({
      author: blogs[0].author,
      likes: blogs[0].likes
    })
  })

  test("Author with most likes of the whole list is determined correctly", () => {
    const mostBlogs = listHelper.mostLikes(blogs)
    expect(mostBlogs).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})