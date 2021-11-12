import Styled from 'styled-components';
import { Link as LinkButton } from 'react-router-dom';

const Link = Styled(LinkButton)`
  font-size: 1rem;
  font-weight: 500;
  line-height: 19px;
  text-align: center;
  cursor: pointer;
  border-radius: 20px;
  width: 400px;
  max-width: 100%;
  padding: 22px 24px;
  display: inline-block;
  text-decoration: none;
  color: ${ props => props.outline ? props.theme.primary : props.theme.white };
  border: 1px solid ${ props => props.outline ? props.theme.primary : props.theme.primary };
  background: ${ props => props.outline ? props.theme.white : props.theme.primary };

  box-shadow:${ props => props.shadow ? '0px 10px 25px rgba(52, 62, 223, 0.35)' : '' } ;
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }
  &.link {
    width: auto;
    padding: 0;
    border-radius: 0;
    background: transparent;
    border: none;
    color: ${ props => props.theme[ props.color ] };
    font-weight: ${ props => props.bold ? 500 : 400 };
    text-decoration: underline;
  }
`;
export default Link;
