import React from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Group, ButtonS } from './FomrLogin.styled';

const FormLogin = () => {
    return (
        <Form>
            <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
            >
                <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Senha">
                <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Lembra-me" />
            </Group>
            <ButtonS variant="primary" type="submit">
               Entrar
            </ButtonS>
        </Form>
    )
}

export default FormLogin