import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBase } from "../../shared/layouts";
import { MenuLateral } from "../../shared/components";
import BoatForm from "../../shared/components/form-barco/FormBarco";

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { idBarco } = useParams<{ idBarco: string | undefined }>();

  const [editar, setEditar] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  
  useEffect(() => {
    if (idBarco) {
      setEditar(true);
    }
  }, [idBarco]);

  return (
    <MenuLateral>
      <Box>
        <LayoutBase
          titulo={editar ? "Editando Informações" : "Cadastro de Barco"}
          children={<BoatForm idBarco={idBarco}/>}
        >
          
        </LayoutBase>
      </Box>
    </MenuLateral>
  );
};

export default Cadastro;
