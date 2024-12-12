import { BrowserRouter } from "react-router-dom"
import { RoutesConfig } from "./routes"
import { ThemeProvider } from "@mui/material"
import { LightTheme } from "./shared/themes"
import { MenuLateral } from "./shared/components"

function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
      <MenuLateral>
        <RoutesConfig/>
      </MenuLateral>
        
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
