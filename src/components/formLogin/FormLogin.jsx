import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import { Group, ButtonS, DivForm } from "./FomrLogin.styled";

const FormLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        const token = await response.text(); // Lê o corpo da resposta como texto
        if (token) {
          localStorage.setItem("token", token); // Salva apenas o token

          // Redireciona para a página principal
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
    <DivForm>
      {/* Campo de Email */}
      <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>

      {/* Campo de Senha */}
      <FloatingLabel controlId="floatingPassword" label="Senha">
        <Form.Control
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>

      {/* Checkbox */}
      <Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Lembre-me" />
      </Group>

      {/* Mensagem de Erro */}
      {errorMessage && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
          {errorMessage}
        </p>
      )}

      {/* Botão de Login */}
      <ButtonS
        onClick={login}
        variant="primary"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Entrar"
        )}
      </ButtonS>
    </DivForm>
  );
};

export default FormLogin;
