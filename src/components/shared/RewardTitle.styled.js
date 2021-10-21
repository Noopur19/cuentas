import Styled from 'styled-components'

const RewardTitle = Styled.h3`
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;
    color: #030303;
    width: 100%;
    display: flex;
    align-items: flex-end;
    margin-bottom: 17px;
    margin-top: 26px;
    &:after{
        content: "";
        background: #CECBDE;
        opacity: 0.5;
        height: 2px;
        width: 60%;
        display: inline-block;

    }

`
export default RewardTitle