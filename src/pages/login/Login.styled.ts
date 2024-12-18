import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  padding: 0;
  margin: 0;
  border: 0;
  justify-content: center;
  @media (min-width: 480px) {
    display: grid;
    grid-template-columns: 3fr 6fr;
    
  }
  justify-content: center;
  
  text-align: center;
`;

export const DivForms = styled.div`
  padding-left: 60px;
  padding-right: 60px;
  margin-top: 20px;
  @media (max-width: 500px) {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

export const SubTitle = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

export const Img = styled.img`
  width: 100%;
  height: 100vh;
  @media (max-width: 480px) {
    display: none;
  }
`;