import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {
    return null
  }
  else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification