import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AppBar, Button, IconButton, Toolbar } from "@mui/material"
import { logout } from "../reducers/authReducer"

const NavBar = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  return (
    <AppBar position="static" sx={{ bgcolor: "grey" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        {user ? (
          <>
            <Button variant="disabled">
              Logged in as {user.name}
            </Button>
            <Button
              id="logout"
              color="inherit"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
