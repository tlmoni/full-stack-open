import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"

import App from "./App"
import store from "./store"
import { createTheme, ThemeProvider } from "@mui/material"

const theme = createTheme({
  typography: {
    fontFamily: [
      "Noto Sans"
    ].join(",")
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>
)
