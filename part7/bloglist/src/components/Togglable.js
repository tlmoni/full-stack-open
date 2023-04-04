import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"
import { Button } from "@mui/material"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = "Togglable"
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
