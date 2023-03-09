import PropTypes from "prop-types"

const Notification = ({ message }) => {
  const notificationStyle = {
    color: "grey",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === "") {
    return null
  }
  return (
    <div id="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notification