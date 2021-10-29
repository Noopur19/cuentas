import Styled from 'styled-components'

export const AdditionalDetailWrap = Styled.div`    
    margin-top: 30px;
    font-size: 12px;
    .additionalDetailsCard {
        box-shadow: 0px 5px 10px rgb(102 62 51 / 2%), 0px 10px 20px rgb(8 32 160 / 22%), 0px 10px 30px rgb(102 62 51 / 6%);
        border-radius: 24px;
        padding: 20px 25px;
        span {
            font-weight: 400px;
            &.price {
                color: ${ props => props.theme.price };
            }
        }
    }
`