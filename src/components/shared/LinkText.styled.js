import Styled from 'styled-components'

const LinkText = Styled.p`
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    color: ${ props => props.theme.secondary };
    display: flex;
    align-items: center;
    justify-content: center;
    .link {
        padding-left: 4px;
    }
`
export default LinkText