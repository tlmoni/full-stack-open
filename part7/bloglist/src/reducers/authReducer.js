import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"
import { setNotification } from "./notificationReducer"

const authSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = authSlice.actions

export const initUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      dispatch(setUser(user))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification("Wrong username or password", 5))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      window.localStorage.clear()
      dispatch(setUser(null))
    } catch (exception) {
      dispatch(setNotification(exception, 5))
    }
  }
}

export default authSlice.reducer
