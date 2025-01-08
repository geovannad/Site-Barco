import { createTheme } from "@mui/material";


export const LightTheme = createTheme({
    palette:{
        primary:{
            main: '#387373',
            light: '#93BFB790',
            contrastText: '#ffffff' ,
        },
        secondary:{
            main: '#E4F2E780',
            dark: '#97A6A080',
            light: '#FFF'
        },
        background: {
            paper: '#E4F2E7'
        }
    }
})