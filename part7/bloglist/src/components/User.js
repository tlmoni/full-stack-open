import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant="h3" component="h1" style={{ paddingTop: 10, paddingBottom: 10 }}>
        {user.name}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" component="h3"><strong>Added blogs</strong></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  {blog.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User
