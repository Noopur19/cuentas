import Styled from 'styled-components';
import bgImage from '../../images/header-img.png'
import bgFullImage from '../../images/header-full.png'

export const NavbarTitle = Styled.div`
    h3{
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
    }
    .card-top-header {
        display: none;
        h5 {
            text-align: center;
            color: ${ (props) => props.theme.white };
            font-size: 18px;
            margin-bottom: 0;
        }
    }
`;
export const Nav = Styled.nav`
    background-image: url(${ bgImage });
    background-repeat: no-rerpeat;
    background-size: cover;
    max-width: 600px;
    z-index: 1;
    position: fixed;
    top: 0;
    left:0;right:0;
    margin: auto;
    .top-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 24px;
        padding-bottom: 50px;
        a {
            width: 4%;
        }
        .sentIcon {
            display: none;
        }
    }
    .progress-wrapper {
        width: 100%;
        color: ${ (props) => props.theme.white };
        h3 {
            font-weight: bold;
            font-size: 26px;
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
    .header-progress {
        padding-bottom: 30px;
        display: none;
        h5 {
            background: #FFB701;
            border-radius: 30px 30px 0 0;
            width: 100%;
            font-weight: bold;
            font-size: 16px;
            line-height: 150%;
            text-align: center;
            color: #896200;
            margin-top: -12px;
            padding: 10px;
        }
    }
    .success-head {
        display: none;
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
            white-space: nowrap;
        }
        p {
            margin-top: 30px;
            font-size: 14px;
            line-height: 17px;
            color: rgb(0 0 0 / 90%);
            text-align: left;
            &.text-green{
                color: ${ props => props.theme.success };
            }
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
        white-space: nowrap;
    }
}
`
export const HeaderCardWrapper = Styled.div`
    margin: -24px -24px 0;
    padding: 0 24px 24px;
    background-color: #081c81;
    background-image: url(${ bgFullImage });
    background-position: bottom;
    background-size: cover;
`