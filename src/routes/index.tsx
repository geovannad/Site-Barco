import { Route, Routes, Navigate } from "react-router-dom"
import {Home, HomeA} from '../pages/index'
import Login from "../pages/login/Login"


export const RoutesConfig = () => {

    return(
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/hoje" element={<HomeA />} />
            <Route path="/" element={<Login />} />

            <Route path="*" element={<Navigate to="/"/>}/>


        </Routes>
    )
}