import Styled from 'styled-components'

const ModalWrapper = Styled.div`
    background: #0000007a;
    .modal-wrap {
        justify-content: center;
        align-items: center;
        display: flex;
        height: 100%;
        .modal-container {
            background: #fff;
            width: 93%;
            text-align: center;
            padding: 19px;
            border-radius: 30px;
            margin: auto;
        }
        button{
            width: calc(50% - 5px);
            font-size: 14px;
            padding: 24px 3px;
            margin: 0 2px;
        }
        h3 {
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 0;
        }
        h4 {
            font-size: 14px;
            line-height: 22px;
        }
        p {
            color: #000;
            margin: 15px 0;
            text-align: center;
        } 
    }   
}
`
export default ModalWrapper