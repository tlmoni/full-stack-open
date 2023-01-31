const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }
  if (message.indexOf("removed") > -1) {
    notificationStyle.color = "red"
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification