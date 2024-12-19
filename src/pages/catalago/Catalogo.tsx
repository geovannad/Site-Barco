import { Box } from "@mui/material"
import { MenuLateral } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"
import BarraBusca from "../../shared/components/busca/busca"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Tabela from "../../shared/components/tabela/tabela"

export const Catalogo = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    console.log("token: " + token)
 
    useEffect(() => {
     if(!token){
         navigate('/')
     }
    }, [navigate, token])
    return(
        <>
            <MenuLateral>
                <Box>
                    <LayoutBase titulo="Catálogo de barcos" barraDeFerramentas={<BarraBusca />} children={null}></LayoutBase>
                    <Tabela></Tabela>
                </Box>

            </MenuLateral>
        </>

    )

}