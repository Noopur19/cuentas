import React, { useState, useEffect  } from 'react'
import PropTypes from 'prop-types';
import { withRouter  } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ReceiverDetailsForm from  './steps/ReceiverDetailsForm'
import TransactionDetailsForm from  './steps/TransactionDetailsForm'
import DeliveryTypeForm from  './steps/DeliveryTypeForm'

import { getLocalData } from 'utils/cache'
import { useDispatch } from 'react-redux'
import { callMyNUNumber } from 'middleware/receiver'

const RewardsStep = () => {
    const dispatch = useDispatch()
    const [ step, setStep ] = useState(1)
    const myWUNumber  = getLocalData('myWUNumber')

    const receivers = useSelector((state) => state.receiver.receivers )

    const handleLoad = () => {
        myWUNumber && dispatch(callMyNUNumber(myWUNumber))
    }
    useEffect(() => {
        window.addEventListener('load', handleLoad);
        return () => {
            window.removeEventListener('load', handleLoad);
        }
    },[])

    const saveData = () =>{
    }
    const nextPage = () => {
        setStep(step+1)
        saveData()
    }

    const prevPage = () =>  {
        setStep(step-1)
    }

    // const finalSubmit = () =>{

    // }

    const handleView = () => {
        switch(step){
        case 1:
            return <ReceiverDetailsForm
                myWUNumber={ myWUNumber }
                className="step-color-pallate"
                saveData={ saveData }
                submitData={ nextPage }
                receivers={ receivers }
                nextPage={ nextPage }
            />
        case 2:
            return <TransactionDetailsForm
                className="step-color-pallate"
                saveData={ saveData }
                prevPage={ prevPage }
                submitData={ nextPage }
                nextPage={ nextPage }
            />
        case 3:
            return  <DeliveryTypeForm
                className="step-color-pallate"
                saveData={ saveData }
                prevPage={ prevPage }
                submitData={ nextPage }
                nextPage={ nextPage }
            />
        default:
            return null
        }
    }
    return(
        <>
            {handleView()}
        </>
    )
}
RewardsStep.propTypes = {
    location:  PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        state: PropTypes.any
    })
};

export default withRouter(RewardsStep)
