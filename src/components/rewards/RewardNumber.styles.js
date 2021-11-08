import Styled from 'styled-components'

const RewardNumber = Styled.div`
    height: calc(100vh - 81px);
    h3 {
        // padding: 20px 24px 0;
        background: ${ props => props.theme.light };
    }
    .rewardWrapper {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 81px);
        background: ${ props => props.theme.light };  
        button {
            margin: 0 24px;
            width: auto;
        }
        .register {
            flex-wrap: wrap;
            padding: 0 24px;
        }
        .description {
            line-height: 21px;
            margin-top: 0px;
            margin-bottom: 12px;
            padding: 0;
        }
        .main-card {
            position: unset;
            margin-top: 0;
        }
        > div:first-child {
            padding: 24px;
            padding-bottom: 0;
        }
    }
    p {
        margin-top: 17px;
    }

    
    .wu-number {
        background: ${ props => props.theme.white };
        box-shadow: 0px 5px 10px rgba(102, 62, 51, 0.02), 0px 10px 20px rgba(8, 32, 160, 0.22), 0px 10px 30px rgba(102, 62, 51, 0.06);
        border-radius: 24px;
        padding: 22px 14px 22px 22px;
        display: flex;
        flex-wrap: wrap;
        align-item: center;
        justify-content: space-between;
        margin: 0 24px;
        input {
            width: 50%;
            order: 1;
        }
        p {
            order: 3;
            margin:0;
        }
        .note-para {
            font-weight: 500;
            font-size: 13px;
            line-height: 21px;
            color: ${ props => props.theme.secondary };
            margin: 0 0 0 15px;
            width: calc(50% - 15px);
            order: 2;
        }
        
    }
   
    .card-link {
        text-align: center;
    }

`
export default RewardNumber