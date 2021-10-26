import Styled from 'styled-components';

const Steps = Styled.div`
    
    .progress-wrapper {
        width: 100%;
        color: ${ (props) => props.theme.white };
        h3 {
            font-weight: bold;
            font-size: 28px;
            line-height: 21px;
            margin-top: 25px;
        }
        .progressbar {
            counter-reset: step;
            padding: 0;
            li {
                list-style-type: none;
                float: left;
                width: calc(25% - 14px);
                height: 10px;
                position: relative;
                text-align: center;
                margin-right: 14px;
                background: ${ (props) => props.theme.progress };
                box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 38px;
                margin-top: 12px; 

                font-weight: 500;
                font-size: 12px;
                line-height: 30px;
                color: ${ (props) => props.theme.success };
                &:last-child {
                    margin-right: 0;
                } 
                &.active {
                    background: ${ (props) => props.theme.success }; 
                    border: 3px solid ${ (props) => props.theme.progress };
                }              
            }
        }
          
    }
`;

export default Steps