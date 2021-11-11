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
`
export default SuccessDetail