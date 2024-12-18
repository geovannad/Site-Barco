import { BrowserRouter } from "react-router-dom"
import { RoutesConfig } from "./routes"
import { ThemeProvider } from "@mui/material"
import { LightTheme } from "./shared/themes"
// import { MenuLateral } from "./shared/components"
import { DrawerProvider } from "./shared/contexts"

function App() {

  return (
    <DrawerProvider>
      <ThemeProvider theme={LightTheme}>
        <BrowserRouter>
        
          <RoutesConfig/>
    
          
        </BrowserRouter>
      </ThemeProvider>
    </DrawerProvider>
  )
}

export default App
