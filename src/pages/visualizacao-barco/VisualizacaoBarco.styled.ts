import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 20px;
    padding: 20px;
  }
`;

export const Img = styled.img`
    width: 100px;
    @media (max-width: 500px) {
        width: 55px;
  }
`

export const TitleLogo = styled.h1`
    @media (max-width: 500px) {
        font-size: 26px;
  }
`

export const SubTitle = styled.h1`
font-size: 18px;
letter-spacing: 7px;
color: gray;`


export const DivForms = styled.div`
  padding: 20px;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0 20px;
  }
`;

export const ListItem = styled.li`
  list-style-type: none;
  flex: 1 1 calc(40% - 10px); 
  padding: 10px;

`;

export const Div = styled.div`
    display: flex;
    align-items: center;

    
`

export const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

export const Description = styled.p`
  font-size: 1.3rem;
  margin: 5px 0;
  line-height: 1.5;
`;
