const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((favoriteBlog, blog) => blog.likes > favoriteBlog.likes ? blog : favoriteBlog, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  else {
    // Group by author
    let blogsByAuthor = blogs.reduce((obj, blog) => {
      obj[blog.author] = obj[blog.author] || []
      obj[blog.author] = [...obj[blog.author], blog]
      return obj
    }, {})

    // Calculate author with most blogs
    return Object.keys(blogsByAuthor).reduce(
      (obj, author) => {
        return obj.blogs > blogsByAuthor[author].length
          ? obj
          : { author: author, blogs: blogsByAuthor[author].length }
      }, {})
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  else {
    // Group by author
    let blogsByAuthor = blogs.reduce((obj, blog) => {
      obj[blog.author] = obj[blog.author] || []
      obj[blog.author] = [...obj[blog.author], blog]
      return obj
    }, {})

    // Calculate author with most likes in their blogs
    return Object.keys(blogsByAuthor).reduce(
      (obj, author) => {
        let likes = blogsByAuthor[author]
          .map(blog => blog.likes)
          .reduce((a, b) => a + b, 0)
        return obj.likes > likes
          ? obj
          : { author: author, likes: likes }
      }, {})
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}