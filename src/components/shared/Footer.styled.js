import Styled from 'styled-components';

export const Card = Styled.div`
  width: 600px;
  max-width: 100%;
  margin: auto;
  background: ${ props => props.theme.white };
  border-radius: 30px 30px 0 0;
  flex: 1;
  padding: 24px;
  padding-bottom: 0;
  overflow: auto;
  position: fixed;
  top: 110px;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: -30px; 
  z-index: 2;
`;

export const FooterButton = Styled.footer`
  position: relative;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  width: 600px;
  max-width: 100%;
  margin: auto;
  text-align: center;
  padding: 24px;
  background: #FFFFFF;
  z-index: 3;
  border-top: 1px solid #dfdede;
  padding: 20px 0;
  @media (max-height: 440px) {
    // position: relative;
    // box-shadow: none;
    // padding: 20px 0;
    // border-top: 1px solid #dfdede;
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
