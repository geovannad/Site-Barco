import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: aliceblue;
  justify-content: center;
  @media (min-width: 480px) {
    display: grid;
    grid-template-columns: 3fr 6fr;
  }
  justify-content: center;
  align-items: center;
  text-align: center;
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
