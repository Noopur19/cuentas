import Styled from 'styled-components';

export const Card = Styled.div`
  width: 600px;
  max-width: 100%;
  margin: auto;
  background: ${ props => props.theme.white };
  border-radius: 30px 30px 0 0;
  flex: 1;
  padding: 24px;
  overflow: auto;
  position: fixed;
  top: 110px;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: -30px;
  padding-bottom: 113px; 
  z-index: 2;
  @media (max-height: 440px) {
    padding-bottom: 0px;
  }
`;

export const FooterButton = Styled.footer`
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  width: 600px;
  max-width: 100%;
  margin: auto;
  text-align: center;
  padding: 24px;
  // padding-bottom: 55px;
  background: #FFFFFF;
  box-shadow: 0px 1px 20px 2px rgba(0, 0, 0, 0.25);
  z-index: 3;
  @media (max-height: 440px) {
    position: relative;
    box-shadow: none;
    padding: 20px 0;
    border-top: 1px solid #dfdede;
  }
  a {
    margin: auto;
    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }
  button {
    width: 49%;
    margin: 0 10px;
  }
`;
