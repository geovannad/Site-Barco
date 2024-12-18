import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const LightTheme = createTheme({
    palette:{
        primary:{
            main: blue[500],
            dark: blue[900],
            light: blue[300],
            contrastText: '#ffffff' ,
        },
        background: {
            paper: '#D9D4D0'
        }
    }
})