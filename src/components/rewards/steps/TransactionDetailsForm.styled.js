import Styled from 'styled-components'

const Transaction = Styled.div`
    .radio-wrapper {
        display: flex;
        align-items: center;
        label {
            order: 2;
            margin: 0;
            margin-left: 10px;
        }
        input.form-control {
            order: 1;
            width: 20px;
            box-shadow: none;
        }
    }
    .converter input {
        width: 38%;
        height: 56px;
        margin-bottom: 20px;
    }
    
`
export default Transaction