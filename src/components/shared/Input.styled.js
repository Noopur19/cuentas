import Styled from 'styled-components'

export const Input = Styled.input`
    background: #F7F7FA;
    border: 0.5px solid #D5D8DE;
    box-sizing: border-box;
    border-radius: 6px;
    &.validation-error {
        background: #f5dcdc96;
        border: 0.3px solid red;
    }
`
