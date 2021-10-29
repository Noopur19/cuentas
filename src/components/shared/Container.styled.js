import Styled from 'styled-components'

const StyledContainer = Styled.div`
   max-width: 600px;
   margin: auto;
   &.active-progress-bar {
      .progress-card {
         top: 190px;
         .myu-head {
            font-size: 22px;
            line-height: 26px;
         } 
         form p {
            min-height: 15px;
            margin-bottom: 12px;
        }        
      }
   } 
   &.active-card {
      .header-card {
         display: flex;
      }
   }
   .transactionHistoryDetail {
      margin-bottom: 0;
      top: 290px;
      border-radius: 0;
      background: ${ props => props.theme.light }
   }
`
export default StyledContainer