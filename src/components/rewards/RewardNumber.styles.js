import Styled from 'styled-components'

const RewardNumber = Styled.div`
    padding-top: 16px;
    background: ${ props => props.theme.light };
    height: calc(100vh - 81px);
    .description {
        line-height: 21px;
        margin-top: 29px;
        margin-bottom: 28px;
    }

`
export default RewardNumber