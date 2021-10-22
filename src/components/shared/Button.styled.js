import Styled from 'styled-components';

const Button = Styled.button`
  font-size: 1rem;
  font-weight: 500;
  line-height: 19px;
  text-align: center;
  border-radius: 20px;
  width: 400px;
  max-width: 100%;
  padding: 22px 24px;
  cursor: pointer;
  display: inline-block;

  color: ${ props => props.outlined ? props.theme.white : props.theme.primary };
  border: 1px solid ${ props => props.theme.primary };
  background: ${ props => props.outlined ? props.theme.primary : props.theme.white };
`;
export default Button