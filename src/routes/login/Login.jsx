import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import FormLogin from '../../components/formLogin/FormLogin';
import { Wrapper, DivForms, Img } from './Login.style';
 import Barco from '../../assets/Barco.webp'

const Login = () => {
    return (
        <>
            <NavBar topics={[]} topicsRoute={[]} />
            <Wrapper>
                <DivForms>
                  <h1>Faça o login!</h1>
                  <FormLogin />
                </DivForms>
                <Img src={Barco} />
            </Wrapper>
        </>
    );
};

export default Login;
