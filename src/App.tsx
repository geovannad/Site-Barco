import React from "react"
import { BrowserRouter } from "react-router-dom"
import { RoutesConfig } from "./routes"
import { ThemeProvider } from "@mui/material"
import { LightTheme } from "./shared/themes"


function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <RoutesConfig/>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
