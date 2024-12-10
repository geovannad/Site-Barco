import React, { useEffect } from "react";
import { Wrapper, Content } from "./BoatId.styled.js";
import CarouselsImages from "../../components/carouselsImages/CarouselsImages.jsx"
import Barco from "../../assets/Barco.webp"
import Logo from "../../assets/logo.jpg"

const BoatId = () => {
    const imagesUrlProps = [Barco, Logo]
    return(
        <Wrapper>
            <CarouselsImages imagesUrl={imagesUrlProps}/>
            <Content/>
        </Wrapper>
    )

}

export default BoatId;