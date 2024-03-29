const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    unique: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: [{
      type: String,
    }],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.plugin(uniqueValidator)
module.exports = mongoose.model("Blog", blogSchema)
