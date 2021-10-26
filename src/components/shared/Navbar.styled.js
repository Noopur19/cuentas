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
    padding: 24px;
    position: Fixed;
    top:0;
    z-index: 1;
    border: 1px solid ${ (props) => props.theme.darkblue };
    .top-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        a {
            width: 10%;
        }
    }
    .progress-wrapper {
        width: 100%;
        color: ${ (props) => props.theme.white };
        h3 {
            font-weight: bold;
            font-size: 28px;
            line-height: 21px;
            margin-top: 25px;
        }
        .progressbar {
            counter-reset: step;
            padding: 0;
            li {
                list-style-type: none;
                float: left;
                width: calc(25% - 14px);
                height: 10px;
                position: relative;
                text-align: center;
                margin-right: 14px;
                background: ${ (props) => props.theme.progress };
                box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 38px;
                margin-top: 12px; 

                font-weight: 500;
                font-size: 12px;
                line-height: 30px;
                color: ${ (props) => props.theme.success };
                &:last-child {
                    margin-right: 0;
                } 
                &.active {
                    background: ${ (props) => props.theme.success }; 
                    border: 3px solid ${ (props) => props.theme.progress };
                }              
            }
        }
          
    }
`;