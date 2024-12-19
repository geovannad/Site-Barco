// import { Button } from "@mui/material"
// import { useDrawerContext } from "../shared/contexts"
import { useNavigate } from "react-router-dom"
import { MenuLateral } from "../shared/components"
import { LayoutBase } from "../shared/layouts"
import { useEffect } from "react";
import BarraBusca from "../shared/components/busca/busca";

export const Home = () => {
   const navigate = useNavigate();
   const token = localStorage.getItem("token");
   console.log("token: " + token)

   useEffect(() => {
    if(!token){
        navigate('/')
    }
   }, [navigate, token])
    

    return(
        <MenuLateral>
        {/* <Button variant="contained" color='primary' onClick={toggleDrawerOpen}>HOME</Button> */}
        <LayoutBase titulo="teste" barraDeFerramentas={<BarraBusca  />} children={null}/>
        </MenuLateral>
    )
}