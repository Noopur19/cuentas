import React, { useEffect  } from 'react'
import PropTypes from 'prop-types';
import { withRouter  } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ReceiverDetailsForm from  './steps/ReceiverDetailsForm'
import ConfirmTransfer from  './steps/ConfirmTransfer'
import TransactionDetailsForm from  './steps/TransactionDetailsForm'
import DeliveryTypeForm from  './steps/DeliveryTypeForm'
import { getUser, getLocalDataMyWuNumber } from 'utils/helpers'
import { getLocalData } from 'utils/cache'
import { useDispatch } from 'react-redux'
import { callMyNUNumber } from 'middleware/receiver'
import { getIncomeDetails } from 'middleware/user'
import Steps from './steps.styles'
import { SET_STEP } from 'constants/app'
const RewardsStep = () => {
    const dispatch = useDispatch()
    const myWUNumber  = getLocalDataMyWuNumber() || getLocalData('myWUNumberTemp')
    const step = useSelector((state) => state.theme.step) || 1
    const receivers = myWUNumber && useSelector((state) => state.receiver.receivers ) || []

    const handleLoad = () => {
        myWUNumber && dispatch(callMyNUNumber(myWUNumber))
        localStorage.removeItem('myWUNumberTemp')
        const incomeId = getUser()?.additional_properties?.incomm_customer_id?.value
        dispatch(getIncomeDetails(incomeId))
    }
    useEffect(() => {
        window.addEventListener('load', handleLoad);
        return () => {
            //localStorage.removeItem('myWUNumberTemp')
            window.removeEventListener('load', handleLoad);

        }
    },[])

    const nextPage = () => {
        dispatch({
            type: SET_STEP,
            step: (step+1)
        })
    }
    const editDetails = () => {
        dispatch({
            type: SET_STEP,
            step: 1
        })
    }

    const prevPage = () =>  {
        dispatch({
            type: SET_STEP,
            step: (step-1)
        })
    }

    // const finalSubmit = () =>{

    // }

    const handleView = () => {
        switch(step){
        case 1:
            return <ReceiverDetailsForm
                myWUNumber={ myWUNumber }
                className="step-color-pallate"
                submitData={ nextPage }
                receivers={ receivers }
                nextPage={ nextPage }
            />
        case 2:
            return <TransactionDetailsForm
                className="step-color-pallate"
                prevPage={ prevPage }
                submitData={ nextPage }
                nextPage={ nextPage }
            />
        case 3:
            return  <DeliveryTypeForm
                className="step-color-pallate"
                prevPage={ prevPage }
                submitData={ nextPage }
                nextPage={ nextPage }
            />
        default:
            return <ConfirmTransfer
                className="step-color-pallate"
                editDetails={ editDetails }
                submitData={ nextPage }
                nextPage={ nextPage }
            />
        }
    }
    return(
        <Steps>
            {/* <div className="progress-wrapper">
                <h3>Receiver Details</h3>
                <ul className="progressbar">
                    <li className="active">Progress</li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div> */}
            {handleView()}
        </Steps>
    )
}
RewardsStep.propTypes = {
    location:  PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        state: PropTypes.any
    })
};

export default withRouter(RewardsStep)
