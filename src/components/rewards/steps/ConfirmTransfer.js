import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reduxForm } from 'redux-form';
import { Card } from '../../shared/Footer.styled'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import { getCountryName, getParseHtmlArticle } from 'utils/helpers'
import { GET_STEP_PROGRESSBAR } from 'constants/app'
import PropTypes from 'prop-types';
import { transactionDetailsValidate as validate } from 'utils/validates'
import SenderDetails from 'components/transactionDetails/transactionHistory/senderDetails'
import { postDeliveryData } from 'middleware/receiver'
import BorderTitle from 'components/shared/BorderTitle.styled';

const ConfirmTransfer = (props) => {
    const { handleSubmit, prevPage } = props;
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.form.receiver_details)
    const incomeDetail = useSelector((state) => state.user.incomeDetail)
    const postDeliveryDetails = useSelector((state) => state.receiver.postDeliveryData)
    const countries = useSelector((state) => state.receiver.countries )

    useEffect(() => {
        dispatch({
            type: GET_STEP_PROGRESSBAR,
            data: { title: 'Confirm Transfer', step: 4 }
        })
        console.log(formValues, postDeliveryDetails)
    }, [])

    const saveData = (values) => {
        dispatch(postDeliveryData(values, incomeDetail))
    }

    const payoutLocationText =  () => {
        if(postDeliveryDetails?.receiver?.address.country_iso_code !== 'US') {
            if(postDeliveryDetails?.paymentDetails?.fix_on_send === 'N') {
                return 'Expected Foreign Country Payout Location'
            } else {
                return 'Foreign Country Payout Location'
            }
        } else if(postDeliveryDetails?.paymentDetails?.fix_on_send === 'N') {
            return 'Expected Payout Location'
        } else {
            return 'Payout Location'
        }
    }

    return (
        <Card>

            <div>
                <form onSubmit={ handleSubmit(saveData) } >
                    <h5>NOT A RECEIPT</h5>
                    <p>Date of transaction: </p>
                    {getParseHtmlArticle('en_wu_118')}
                    {postDeliveryDetails?.sender && <SenderDetails sender={ postDeliveryDetails?.sender } />}
                    <BorderTitle smallText className="mt-4">Final Receiver</BorderTitle>

                    <div className="d-flex justify-content-between info">
                        <p>Name</p>
                        <span><b> {postDeliveryDetails?.receiver?.name?.first_name || ''} {postDeliveryDetails?.receiver?.name?.middle_name || ''} {postDeliveryDetails?.receiver?.name.last_name || ''}</b>
                        </span>
                    </div>

                    <div className="d-flex justify-content-between info">
                        <p>{payoutLocationText()}</p>
                        <span><b>{getCountryName(countries, postDeliveryDetails?.receiver?.address.country_iso_code)}</b>
                        </span>
                    </div>
                    {postDeliveryDetails?.receiver?.address.city &&
                        <div className="d-flex justify-content-between info">
                            <p>Payout City</p>
                            <span><b>{postDeliveryDetails?.receiver?.address.city}</b>
                            </span>
                        </div>
                    }
                    {getParseHtmlArticle('en_wu_117')}
                    {getParseHtmlArticle('en_wu_114')}
                    <Button onClick={ prevPage } >Edit details</Button>
                    <Button outlined type='submit'>Confirm and Send</Button>
                    {getParseHtmlArticle('en_wu_115')}
                    {getParseHtmlArticle('en_wu_111')}
                    <Footer/>
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