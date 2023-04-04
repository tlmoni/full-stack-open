import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"

const UserList = () => {
  const users = useSelector(({ users }) => users)

  if (!users) {
    return null
  }

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        style={{ paddingTop: 10, paddingBottom: 10 }}
      >
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>
                <Typography variant="strong" component="strong">
                  Blogs created
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link key={user.id} to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
