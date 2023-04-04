import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell
} from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (!blogs) {
    return null
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs
            .slice()
            .sort(byLikes)
            .map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link key={blog.id} to={`/blogs/${blog.id}`}>
                    {blog.title} by {blog.author}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList
