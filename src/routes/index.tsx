import { Route, Routes, Navigate } from "react-router-dom"
import { Button } from "@mui/material"


export const RoutesConfig = () => {
    return(
        <Routes>
            <Route path="/home" element={<Button variant="contained" color='primary'>HOME</Button>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>


        </Routes>
    )
}