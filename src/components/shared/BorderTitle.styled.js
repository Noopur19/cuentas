import Styled from 'styled-components'

const BorderTitle = Styled.div`
width: 100%;
display: flex;
align-items: flex-end;
justify-content: space-between;
margin-bottom: 17px;
color:  ${ props => props.theme.light };
overflow: hidden;
    h3 {
        font-weight: ${ props => props.smallText ? '400' : 'bold' };
        font-size: 22px;
        line-height: 26px;
        padding-right: 0 !important;
        display: inline-block;
        margin-right: 5px;
        font-size: ${ props => props.smallText ? '16px' : '22px' };
        color: ${ props => props.smallText ? props.theme.primary : props.theme.textBlack };
        .underline {
            position: relative;
            &:after {
                content: "";
                position: absolute;
                left: calc(100% + 10px);
                width: 100vw;
                height: 2px;
                background: ${ props => props.theme.lightGrey };
                right: 0;
                top: 9px;
            }
        }
    }
    
    

`
export default BorderTitle