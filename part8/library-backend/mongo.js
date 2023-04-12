const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
require("dotenv").config()

const authors = [
  {
    name: "Robert Martin",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    born: 1963
  },
  {
    name: "Fyodor Dostoevsky",
    born: 1821
  },
  {
    name: "Joshua Kerievsky",
  },
  {
    name: "Sandi Metz",
  }
]

const books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"]
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"]
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"]
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"]
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"]
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"]
  },
  {
    title: "The Demon",
    published: 1872,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "revolution"]
  }
]

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)
mongoose.connect(url)

authors.forEach(author => {
  const authorObj = new Author(author)
  authorObj.save()
})

books.forEach(book => {
  Author
    .findOne({ name: book.author })
    .then(author => {
      const bookObj = new Book({ ...book, author: author._id })
      try {
        bookObj.save()
      }
      catch (error) {
        console.log(error)
      }
    })
})
