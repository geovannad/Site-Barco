import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    height: calc(100vh - 80px);
    background-color: aliceblue;
    justify-content: center;
    @media (min-width: 480px) {
        display: grid;
        grid-template-columns: 5fr 6fr;    
    }
`;

export const DivForms = styled.div`
    padding: 15% 10%;
    height: 100%;
    padding: 15% 10% 0 10%;
    @media (max-width: 480px) {
        align-items: center;
        display: flex;
        flex-direction: column;
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100vh;
    @media (max-width: 480px) {
        display: none;
    }
`