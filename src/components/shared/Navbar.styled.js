import Styled from 'styled-components';
import bgImage from '../../images/header-img.png'

export const NavbarTitle = Styled.h3`
    text-align: center;
    color: ${ (props) => props.theme.white };
    font-size: 18px;
    margin-bottom: 0;
    i {
        font-size: 12px;
        line-height: 1;
        display: block;
        text-align: right;
    }
`;
export const Nav = Styled.nav`
    background-image: url(${ bgImage });
    background-repeat: no-rerpeat;
    background-size: cover;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    position: Fixed;
    top:0;
    border: 1px solid ${ (props) => props.theme.darkblue };
`;