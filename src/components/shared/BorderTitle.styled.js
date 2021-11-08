import Styled from 'styled-components'

const BorderTitle = Styled.div`
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;
    color:  ${ props => props.theme.light };
    width: 100%;
    display: flex;
    align-items: flex-end;
    margin-bottom: 17px;
    // padding: 20px 24px 0;
    h3 {
        padding-right: 0 !important;
        display: inline-block;
        font-size: ${ props => props.smallText ? '16px' : '22px' };
        font-weight: ${ props => props.smallText ? '400' : 'bold' };
        color: ${ props => props.smallText ? props.theme.primary : props.theme.textBlack };
    }
    
    
    &:after{
        // margin-right: 30px;
        content: "";
        background: ${ props => props.theme.lightGrey };
        opacity: 0.5;
        height: 2px;
        width: 46%;
        display: inline-block;
        margin-left: auto;
    }

`
export default BorderTitle