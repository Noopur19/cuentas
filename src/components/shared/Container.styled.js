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
            .confirm_btn {
               button {
                  padding: 22px 16px;
               }
            }
        }        
      }
      .CardFooter {
         .description {
           display: none;
         }
      }
      &.confirm {
         .header-progress {
            display: block;
         }
         .progress-card {
            border-radius: 0;
            margin-top: 20px;
            padding-bottom: 20px;
            padding: 24px 0;
        }
      } 
   } 
   &.active-card {
      nav{
         background-image: none;
         background-color: #081c81;
      }
      .header-card {
         display: flex;
         margin-top: 0;
      }
      .top-header {
         .sentIcon {
            display: block;
         }
      }
      .card-top-header {
         display: block;
      }
      .main-title h3{
         display: none;
      }
   }
   .transactionHistoryDetail {
      padding-bottom: 0;
      // top: 290px;
      border-radius: 0;
      background: ${ props => props.theme.light }
   }
   &.success {
      .top-header {
         padding-bottom: 20px;
      }
      .success-container {
         top: 170px;
         padding-bottom: 10px;
      }
      .success-head {
         display: block;
         padding: 10px 20px 50px 20px;
         h3 {
             color: #fff;
             font-weight: bold;
             font-size: 28px;
             line-height: 21px;
         }
      }
   }
`
export default StyledContainer