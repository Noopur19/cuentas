import Styled from 'styled-components'

const BorderTitle = Styled.div`
width: 100%;
display: flex;
align-items: flex-end;
justify-content: space-between;
margin-bottom: 17px;
color:  ${ props => props.theme.light };
    h3 {
        font-weight: ${ props => props.smallText ? '400' : 'bold' };
        font-size: 22px;
        line-height: 26px;
        padding-right: 0 !important;
        display: inline-block;
        font-size: ${ props => props.smallText ? '16px' : '22px' };
        color: ${ props => props.smallText ? props.theme.primary : props.theme.textBlack };
    }
    &:after{
        content: "";
        background: ${ props => props.theme.lightGrey };
        opacity: 0.5;
        height: 2px;
        width: 46%;
        display: inline-block;
        margin-bottom: 10px;
    }
    
    

`
export default BorderTitle