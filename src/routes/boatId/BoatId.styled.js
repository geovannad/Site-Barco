import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  @media (min-width: 480px) {
    display: grid;
    grid-template-columns: 6fr 3fr;
  }
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;