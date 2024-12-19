import { Route, Routes, Navigate } from "react-router-dom"
import {HomeA} from '../pages/index'
import Login from "../pages/login/Login"
import { Catalogo } from "../pages/catalago/Catalogo"


export const RoutesConfig = () => {

    return(
        <Routes>
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/hoje" element={<HomeA />} />
            <Route path="/" element={<Login />} />

            <Route path="*" element={<Navigate to="/"/>}/>


        </Routes>
    )
}