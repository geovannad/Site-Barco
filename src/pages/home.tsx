// import { Button } from "@mui/material"
// import { useDrawerContext } from "../shared/contexts"
import { FerramentasDaListagem, MenuLateral } from "../shared/components"
import { LayoutBase } from "../shared/layouts"

export const Home = () => {
    // const { toggleDrawerOpen } = useDrawerContext()

    return(
        <MenuLateral>
        {/* <Button variant="contained" color='primary' onClick={toggleDrawerOpen}>HOME</Button> */}
        <LayoutBase titulo="teste" barraDeFerramentas={<FerramentasDaListagem mostrarInputBusca={true}  />} children={null}/>
        </MenuLateral>
    )
}