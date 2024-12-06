import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import FormLogin from '../../components/formLogin/FormLogin';
import { Wrapper, DivForms, Img, SubTitle } from './Login.style';
import Barco from '../../assets/Barco.webp'
import Logo from '../../assets/logo.jpg'

const Login = () => {
    return (
        <>
            <Wrapper>
                <DivForms> 
                  <img src={Logo} width="100px"></img>
                  <h1>Store Boat</h1>
                  <SubTitle >Faça o login!</SubTitle>
                  <FormLogin />
                </DivForms>
                <Img src={Barco} />
            </Wrapper>
        </>
    );
};

export default Login;
