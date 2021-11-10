import Styled from 'styled-components'

export const HistoryDetail = Styled.div`
    background: #fff;
    margin: 30px -22px;
    padding: 4px 25px;
    border-radius: 25px 25px0 0;
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

export const Transaction = Styled.div`
    .info {
        p,
        span{
            font-size: 12px;
            margin-bottom: 4px;
            word-break: break-all;

        }
    }
    .info-heading {
        font-weight: 800;
        h4 {
            font-weight: 800;
            font-size: 16px;
            line-height: 22px;
        }
        span {
            font-size: 18px;
            line-height: 21px;
        }
    }
    .article {
        font-size: 12px;
        line-height: 20px;
        margin-top: 30px;
    }
`

export const AdditionalDetailWrap = Styled.div`    
    margin-top: 30px;
    font-size: 12px;
    .additionalDetailsCard {
        box-shadow: 0px 5px 10px rgb(102 62 51 / 2%), 0px 10px 20px rgb(8 32 160 / 22%), 0px 10px 30px rgb(102 62 51 / 6%);
        border-radius: 24px;
        padding: 20px 25px;
        span {
            font-weight: 600;
            &.price {
                color: ${ props => props.theme.price };
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
    }
`
