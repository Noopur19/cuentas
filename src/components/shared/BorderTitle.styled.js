import Styled from 'styled-components'

const BorderTitle = Styled.h3`
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;
    color:  ${ props => props.theme.light };
    width: 100%;
    display: flex;
    align-items: flex-end;
    margin-bottom: 17px;

    font-size: ${ props => props.smallText ? '16px' : '22px' };
    font-weight: ${ props => props.smallText ? '400' : 'bold' };
    color: ${ props => props.smallText ? props.theme.primary : props.theme.textBlack };

    &:after{
        content: "";
        background: ${ props => props.theme.lightGrey };
        opacity: 0.5;
        height: 2px;
        width: 53%;
        display: inline-block;
        margin-left: auto;
        flex: 1;
    }

`
export default BorderTitle