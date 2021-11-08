import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reduxForm } from 'redux-form';
import Button from 'components/shared/Button.styled'
import { getCountryName, getParseHtmlArticle } from 'utils/helpers'
import { GET_STEP_PROGRESSBAR } from 'constants/app'
import PropTypes from 'prop-types';
import { transactionDetailsValidate as validate } from 'utils/validates'
import SenderDetails from 'components/transactionDetails/transactionHistory/senderDetails'
import TransactionDetails from 'components/transactionDetails/transactionHistory/transactionDetails'
import { postDeliveryData } from 'middleware/receiver'
import BorderTitle from 'components/shared/BorderTitle.styled';
import moment from 'moment'
import CardFooter from 'components/shared/CardFooter';
import { Card } from 'components/shared/Footer.styled';
import history from 'utils/history';
import { ROUTES } from 'constants/AppRoutes';
import { useTranslation } from 'react-i18next';

const ConfirmTransfer = (props) => {
    const { t } = useTranslation()
    const { handleSubmit, editDetails } = props;
    const dispatch = useDispatch()
    const incomeDetail = useSelector((state) => state.user.incomeDetail)
    const postDeliveryDetails = useSelector((state) => state.receiver.postDeliveryData)
    const countries = useSelector((state) => state.receiver.countries )
    const dateTime = postDeliveryDetails && postDeliveryDetails?.date_time
    const date = dateTime && (dateTime.split('T')[ 0 ]).trim();
    const formattedDate = date && moment(date).format('DD MMMM,YYYY')

    useEffect(() => {
        dispatch({
            type: GET_STEP_PROGRESSBAR,
            data: { title: 'Confirm Transfer', step: 4 }
        })
    }, [])

    const saveData = (values) => {
        dispatch(postDeliveryData(values, incomeDetail))
    }

    const payoutLocationText =  () => {
        if(postDeliveryDetails?.receiver?.address.country_iso_code !== 'US') {
            if(postDeliveryDetails?.paymentDetails?.fix_on_send === 'N') {
                return t('EXPECTED_FOREIGN_COUNTRY_PAYOUT_LOCATION')
            } else {
                return t('FOREIGN_COUNTRY_PAYOUT_LOCATION')
            }
        } else if(postDeliveryDetails?.paymentDetails?.fix_on_send === 'N') {
            return t('EXPECTED_COUNTRY_PAYOUT_LOCATION')
        } else {
            return t('COUNTRY_PAYOUT_LOCATION')
        }
    }

    return (
        <Card className="progress-card">
            <div>
                <form onSubmit={ handleSubmit(saveData) } >
                    <h5>{t('NOT_A_RECEIPT')}</h5>
                    <p>{t('DATE_OF_TRANSACTION')}: {formattedDate}</p>
                    {getParseHtmlArticle('wu_118')}
                    {postDeliveryDetails?.sender && <SenderDetails sender={ postDeliveryDetails?.sender } />}
                    <BorderTitle smallText className="mt-4"><h3>{t('FINAL_RECEIVER')}</h3></BorderTitle>

                    <div className="d-flex justify-content-between info">
                        <p>{t('NAME_TEXT')}</p>
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
                            <p>{t('PAYOUT_CITY')}</p>
                            <span><b>{postDeliveryDetails?.receiver?.address.city}</b>
                            </span>
                        </div>
                    }
                    {postDeliveryDetails?.payment_details && <TransactionDetails receiverData={ postDeliveryDetails?.receiver } wu_product={ postDeliveryDetails?.wu_product }  payment={ postDeliveryDetails?.payment_details } />}

                    {getParseHtmlArticle('wu_117')}
                    {getParseHtmlArticle('wu_114')}
                    <Button onClick={ editDetails } >{t('EDIT_DETAILS')}</Button>
                    <Button outlined onClick={ () => history.push(ROUTES.SUCCESS_PAGE) } type='submit'>{t('CONFIRM_SEND')}</Button>
                    {getParseHtmlArticle('wu_115')}
                    {getParseHtmlArticle('wu_111')}
                    <CardFooter/>
                </form>
            </div>
        </Card>

    )
}

ConfirmTransfer.propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.object,
    editDetails: PropTypes.func,
    submitData: PropTypes.func
};
export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
    destroyOnUnmount: false,
    validate

})(ConfirmTransfer);