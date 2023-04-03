import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return blogs
    .slice()
    .sort(byLikes)
    .map((blog) => <Blog key={blog.id} blog={blog} />)
}

export default BlogList
