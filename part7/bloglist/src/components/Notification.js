import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  const style = {
    color: "grey",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notification === null) {
    return null
  } else {
    return <div style={style}>{notification}</div>
  }
}

export default Notification
