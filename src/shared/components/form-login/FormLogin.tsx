import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  CircularProgress,
} from "@mui/material";
import { StyledBox } from "./FormLogin.styled";

const FormLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://ms-internautica-crm.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.text();
        if (token) {
          localStorage.setItem("token", token);
          navigate("/home");
        }
      } else if (response.status === 401) {
        setErrorMessage("Email ou senha inválidos. Tente novamente.");
      } else {
        setErrorMessage("Erro no servidor. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setErrorMessage("Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledBox>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />

      {/* Checkbox */}
      <FormControlLabel
        control={<Checkbox />}
        label="Lembre-me"
        sx={{ mt: 2 }}
      />

      {/* Mensagem de Erro */}
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2, fontSize: "14px" }}>
          {errorMessage}
        </Typography>
      )}

      {/* Botão de Login */}
      <Button
        onClick={login}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "#fff" }} />
        ) : (
          "Entrar"
        )}
      </Button>
    </StyledBox>
  );
};

export default FormLogin;
