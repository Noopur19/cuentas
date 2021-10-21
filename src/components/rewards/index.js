import React, { useState  } from 'react'
import PropTypes from 'prop-types';
import { withRouter  } from 'react-router-dom';
import ReceiverDetailsForm from  './steps/ReceiverDetailsForm'
import TransactionDetailsForm from  './steps/TransactionDetailsForm'

const RewardsStep = () => {
    const [ step, setStep ] = useState(1)

    const saveData = () =>{
    }
    const nextPage = () => {
        setStep(step+1)
        saveData()
    }

    // const prevPage = () =>  {
    //     setStep(step-1)
    // }

    // const finalSubmit = () =>{

    // }

    const handleView = () => {
        switch(step){
        case 1:
            return <ReceiverDetailsForm
                className="step-color-pallate"
                saveData={ saveData }
                submitData={ nextPage }
                nextPage={ nextPage }
            />
        case 2:
            return <TransactionDetailsForm
                className="step-color-pallate"
                saveData={ saveData }
                submitData={ nextPage }
                nextPage={ nextPage }
            />
        case 3:
            return null
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
