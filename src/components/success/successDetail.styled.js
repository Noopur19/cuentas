import Styled from 'styled-components';

const SuccessDetail = Styled.div`
    .small-text {
        p {
            font-size: 12px;
            line-height: 22px;
        }
    }
    .info {
        p {
            width: 50%;
        }
        span {
            width: 50%;
            text-align: right;
            word-break: break-all;
        }
    }
    .info-heading {
        font-weight: 700;
        h4 {
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            width: 60%
        }
        span{
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            width: 40%;
            text-align: right;
            word-break: break-all;
        }
    }
    .modal {
        .modal-wrap {
            .modal-container {
                position: relative;
                text-align: left;
                h3 {
                    font-size: 20px;
                    line-height: 30px;
                    margin-right: 20px;
                }
                p {
                    font-size: 16px;
                    line-height: 22px;
                    text-align: left;
                }

                button {
                    padding: 14px;
                    border-radius: 14px;
                    &:nth-of-type(1){
                        margin-left: 0;
                    }
                    &:nth-of-type(2){
                        margin-right: 0;
                    }
                    @media (max-width: 395px) {
                        width: 100%;
                        margin: 0;
                        margin-bottom: 10px;
                    }
                }
                .cancel {
                    position: absolute;
                    right: 30px;
                    top: 22px;
                }
            }
        }
    }
`
export default SuccessDetail