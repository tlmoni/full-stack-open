import { useSelector } from "react-redux"
import { Alert } from "@mui/material"

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (notification === null) {
    return null
  } else {
    return <Alert severity="info">{notification}</Alert>
  }
}

export default Notification
