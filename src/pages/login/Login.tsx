import FormLogin from '../../shared/components/form-login/FormLogin';
import { Wrapper, DivForms, Img, SubTitle } from './Login.styled';
import Barco from '../../assets/Barco.webp'
import Logo from '../../assets/logo.jpg'

const Login = () => {
    return (
        <>
            <Wrapper>
                <DivForms> 
                  <img src={Logo} width="100px"></img>
                  <h1>Bergamin Boats</h1>
                  <SubTitle >Faça o login!</SubTitle>
                  <FormLogin />
                </DivForms>
                <Img src={Barco} />
            </Wrapper>
        </>
    );
};

export default Login;