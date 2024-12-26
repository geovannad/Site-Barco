import { Route, Routes, Navigate } from "react-router-dom"
import Login from "../pages/login/Login"
import { Catalogo } from "../pages/catalago/Catalogo"
import VisualizacaoBarco from "../pages/visualizacao-barco/VisualizacaoBarco"
import Cadastro from "../pages/cadastro/cadastro"



export const RoutesConfig = () => {

    return(
        <Routes>
            <Route path="/catalogo" element={<Catalogo />} />
            
            <Route path="/" element={<Login />} />

            <Route path="*" element={<Navigate to="/"/>}/>

            <Route path="/catalogo/barco/:idBarco" element={<VisualizacaoBarco/>}/>

            <Route path="/barco/cadastro/:idBarco?" element={<Cadastro/>} />



        </Routes>
    )
}