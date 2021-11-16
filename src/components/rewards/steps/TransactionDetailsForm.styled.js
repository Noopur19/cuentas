import Styled from 'styled-components'

export const Transaction = Styled.div`
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
    .r-info {
        span {
            width: 50%;
        }
    }
    .converter {
        flex-wrap: wrap;
        input {
            width: 35%;
            height: 56px;
            margin-bottom: 10px;
            order: 0;
        }
        img {
            width: calc(20% - 30px);
            margin: 0 30px;
            order: 0;
        }
        p {
            width: 35%;
            order: 1;
            text-align:left;
            min-height: 20px;
        }
    } 
    
`
export const FeeData = Styled.div`
    background: #FFB701;
    border: 0.5px solid #D5D8DE;
    padding: 15px;
    margin-bottom: 10px;
`