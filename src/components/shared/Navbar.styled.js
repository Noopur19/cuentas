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
    padding-bottom: 50px;
    z-index: 1;
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

export const HeaderCard = Styled.div`
    background: ${ props => props.theme.white };
    border-radius: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;    
    align-items: stretch;
    padding: 22px;
    margin-top: 20px;
    width: 100%;
    z-index: 1;
    display: none;
    .amount-paid {
        h2 {
            font-size: 16px;
            line-height: 22px;
        }
        span {
            font-weight: 800;
            font-size: 36px;
            line-height: 41px;
            color: ${ props => props.theme.price };
        }
        p {
            margin-top: 30px;
            font-size: 14px;
            line-height: 17px;
            color: rgb(0 0 0 / 90%);
            text-align: left;
        }
    }
    .amount-img {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    img {
        width:  30%;
        text-align: right;
        margin-left: auto;
        margin-bottom: 20px;
    }
    
    .amount-img {
        text-align: right;
    }
    
    p {
        font-size: 14px;
        line-height: 17px;
        text-align: right;
        color: #CECBDE;
        margin-bottom: 0;
    }
} 
`