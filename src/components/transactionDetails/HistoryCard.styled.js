import Styled from 'styled-components'

const HistoryCard = Styled.div`
margin-bottom: 10px;
h5 {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #CECBDE;
}
.card-item {
    background: ${ props => props.theme.white };
    box-shadow: 0px 5px 10px rgba(102, 62, 51, 0.02), 0px 10px 20px rgba(8, 32, 160, 0.22), 0px 10px 30px rgba(102, 62, 51, 0.06);
    border-radius: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    .img-wrapper {
        width: 30%;
        background: rgb(235 87 87 / 10%);
        border-radius: 14px;
        padding: 20px;
        display:flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    .detail {
        width: calc(40% - 10px);
        margin: 0 5px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        h6 {
            font-weight: bold;
            font-size: 12px;
            line-height: 22px;
            color: #333333;
            margin:0;
        }
        
        .invoice {
            font-size: 12px;
            line-height: 22px;
            margin:0;
        }
        
        .status {
            font-size: 12px;
            line-height: 22px;
            color: green;
            margin:0;
        }
    }
    .pricing {
        width: 30%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        .time {
            font-weight: bold;
            font-size: 12px;
            line-height: 22px;
            color: #CECBDE;
            text-align: right;
            margin:0;
        }        
        .price {
            font-weight: bold;
            font-size: 16px;
            line-height: 21px;
            color: ${ props => props.theme.price };
            text-align: right;
            margin: 0;
        }
    }
}


`
export default HistoryCard