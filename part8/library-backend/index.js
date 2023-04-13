const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")
const express = require("express")
const cors = require("cors")
const http = require("http")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const User = require("./models/user")
require("dotenv").config()

const URL = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.set("strictQuery", false)
console.log("Connecting to MongoDB")
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error connection to MongoDB: ", error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/"
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      }
    }),
  )
  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()