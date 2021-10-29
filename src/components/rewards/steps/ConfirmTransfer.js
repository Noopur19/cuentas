import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  reduxForm } from 'redux-form';
import { Card } from '../../shared/Footer.styled'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import { getParseHtmlArticle } from 'utils/helpers'
import { GET_STEP_PROGRESSBAR } from 'constants/app'
import PropTypes from 'prop-types';
import { transactionDetailsValidate as validate } from 'utils/validates'
import SenderDetails from 'components/transactionDetails/transactionHistory/senderDetails'
const ConfirmTransfer = (props) => {
    const { handleSubmit , prevPage } = props;
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.form.receiver_details)
    const incomeDetail = useSelector((state) => state.user.incomeDetail)
    const postDeliveryData = useSelector((state) => state.receiver.postDeliveryData)

    useEffect(() =>{
        dispatch({
            type: GET_STEP_PROGRESSBAR,
            data: { title: 'Confirm Transfer', step: 4 }
        })
        console.log(formValues,postDeliveryData)
    },[])

    const saveData = (values) => {
        dispatch(postDeliveryData(values,incomeDetail))
    }

    return (
        <Card>

            <div>
                <h5>Select a Delivery Type</h5>
                <form onSubmit={ handleSubmit(saveData) } >
                    <h5>NOT A RECEIPT</h5>
                    <p>Date of transaction: </p>
                    {getParseHtmlArticle('en_wu_118')}
                    {postDeliveryData?.sender && <SenderDetails sender={ postDeliveryData?.sender } />}

                    <Footer>
                        <Button onClick={ prevPage } >Back</Button>
                        <Button outlined type='submit'>Continue</Button>
                    </Footer>
                </form>
            </div>
        </Card>

    )
}

ConfirmTransfer.propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.object,
    prevPage: PropTypes.func,
    submitData: PropTypes.func
};
export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
    destroyOnUnmount: false,
    validate

})(ConfirmTransfer);