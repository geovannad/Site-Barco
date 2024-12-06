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

  // Função de login
  const login = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setErrorMessage(""); 
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha na requisição");
      }

      const data = await response.json();

      if (data.status === 200) {
        console.log(data.message);
        alert("Login realizado com sucesso!");
        navigate("/home"); 
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setErrorMessage(
        "Ocorreu um erro ao realizar o login. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DivForm>
      <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>
      <Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Lembra-me" />
      </Group>
      {errorMessage && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
          {errorMessage}
        </p>
      )}
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
