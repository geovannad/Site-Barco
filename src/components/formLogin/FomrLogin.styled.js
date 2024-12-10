import styled from "styled-components"
import Form  from "react-bootstrap/Form"
import Button  from "react-bootstrap/Button"

export const Group = styled(Form.Group)`
    margin: 15px 0px 15px 0px;
    text-align: start;
`
export const ButtonS =  styled(Button)`
    width:100%; 
`
export const DivForm = styled(Form)`
    @media (max-width: 480px) {
        width: 300px;
    }
`
