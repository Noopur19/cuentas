import Styled from 'styled-components'

const RewardNumber = Styled.div`
    height: calc(100vh - 48px);
    padding-top: 107px;
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
            justify-content: flex-start;
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
            padding-top: 0;
            padding-bottom: 50px;
        }
        > div:first-child {
            padding: 24px;
            padding-bottom: 0;
            h3 {
                overflow: hidden;
                .underline:after {
                    top: 15px;
                }
            }
        }
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
        input[type="checkbox"] {
            width: calc(20% - 15px);
            align-self: center;
        }
        p {
            order: 3;
            margin:0;
        }
        .note-para {
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            color: ${ props => props.theme.secondary };
            width: calc(30% - 15px);
            order: 2;
        }
        
    }
    .continue-wrapper {
        padding: 22px;
    }
   
    .card-link {
        text-align: center;
    }

`
export default RewardNumber