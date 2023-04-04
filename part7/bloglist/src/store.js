import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/authReducer"
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: authReducer,
    users: userReducer
  }
})

export default store
