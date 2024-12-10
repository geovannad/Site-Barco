import React, { useEffect } from "react";
import { Wrapper } from "./BoatId.styled.js";

const BoatId = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    console.log(token);
  
    useEffect(() => {
      if (!token) {
        navigate('/');
      }
    }, [navigate, token]); 
    return(
        <Wrapper></Wrapper>
    )

}

export default BoatId;