const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET
const PASSWORD = process.env.PASSWORD

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          return await Book.find({ author: author.id, genres: { $in: [args.genre] } }).populate("author")
        }
        else {
          return  await Book.find({ author: author.id }).populate("author")
        }
      }
      else if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author")
      }
      else {
        return Book.find({}).populate("author")
      }
    },
    allGenres: async () => {
      let genres = []
      const books = await Book.find({})
      books.forEach(book => {
        book.genres.forEach(genre => {
          if (!genres.includes(genre)) {
            genres.push(genre)
          }
        })
      })
      return genres
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root, args) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: author.id })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("Not authenticated")
      }

      if (await Book.findOne({ title: args.title })) {
        throw new GraphQLError("Book already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        }
        catch (error) {
          throw new GraphQLError(error)
        }
      }

      author = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: author })

      try {
        await book.save()
      }
      catch (error) {
        throw new GraphQLError(error)
      }

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("Not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo

      try {
        return author.save()
      }
      catch (error) {
        throw new GraphQLError(error)
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user
        .save()
        .catch(error => {
          throw new GraphQLError(error)
        })
    },
    login: async (root, args) => {
      let user = await User.findOne({ username: args.username })

      if (!user || args.password !== PASSWORD) {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }

      user = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(user, JWT_SECRET) }
    }
  }
}

module.exports = resolvers