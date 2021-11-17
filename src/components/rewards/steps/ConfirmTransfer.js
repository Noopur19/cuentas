import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reduxForm } from 'redux-form';
import Button from 'components/shared/Button.styled'
import { getCountryName, getParseHtmlArticle } from 'utils/helpers'
import { GET_STEP_PROGRESSBAR } from 'constants/app'
import PropTypes from 'prop-types';
import { transactionDetailsValidate as validate } from 'utils/validates'
import SenderDetails from 'components/transactionDetails/transactionHistory/senderDetails'
import TransactionDetails from 'components/transactionDetails/transactionHistory/transactionDetails'
import { postConfirmTransfer } from 'middleware/transactionDetails'
import BorderTitle from 'components/shared/BorderTitle.styled';
import moment from 'moment'
import CardFooter from 'components/shared/CardFooter';
import { Card } from 'components/shared/Footer.styled';
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
import { getAllStates } from 'middleware/receiver';

const ConfirmTransfer = (props) => {
    const { t } = useTranslation()
    const { handleSubmit, editDetails } = props;
    const dispatch = useDispatch()
    const storeDetails = useSelector((state) => state.user.storeDetail)
    const postDeliveryDetails = useSelector((state) => state.receiver.postDeliveryData)
    const countries = useSelector((state) => state.receiver.countries )
    const states = useSelector((state) => state.receiver.states )

    const dateTime = postDeliveryDetails && postDeliveryDetails?.date_time
    const date = dateTime && (dateTime.split('T')[ 0 ]).trim();
    const formattedDate = date && moment(date).format('MMMM DD,YYYY')
    const [ scrollBottom, setScrollBottom ] = useState(false)
    console.log(scrollBottom)

    const  isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    const handleScroll = () => {
        const element = document.querySelector('.card-link')
        setScrollBottom(isInViewport(element))
    }

    useEffect(() => {
        document.querySelector('.progress-card').addEventListener('scroll', handleScroll)
        dispatch(getAllStates(postDeliveryDetails?.sender?.address?.country_iso_code))
        dispatch({
            type: GET_STEP_PROGRESSBAR,
            data: { title: t('CONFIRM_TRANSFER'), step: 4 }
        })
        return () => {
            document.querySelector('.progress-card') && document.querySelector('.progress-card').removeEventListener('scroll', handleScroll)
        }
    }, [])

    const getFinalAmount = () => {
        const finalAmount = _.get(postDeliveryDetails?.payment_details,'origination.gross_amount');
        return parseInt(finalAmount) > 0 ? parseInt(finalAmount) / 100 : 0;
    };

    const saveData = () => {
        dispatch(postConfirmTransfer(postDeliveryDetails, getFinalAmount(),storeDetails, t))
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
        <Card className="progress-card p-none">
            <div>
                <form onSubmit={ handleSubmit(saveData) } >
                    <p className="px-24 text-center">{t('DATE_OF_TRANSACTION')}: <b>{formattedDate}</b></p>
                    <p  className="px-24">{getParseHtmlArticle('wu_118')}
                        {postDeliveryDetails?.sender && <SenderDetails states={ states }  countries={ countries } sender={ postDeliveryDetails?.sender } />}
                        <BorderTitle smallText className="mt-4"><h3>{t('FINAL_RECEIVER')}
                            <span className="underline"></span></h3>
                        </BorderTitle>
                    </p>

                    <div className="d-flex justify-content-between info px-24">
                        <p>{t('NAME_TEXT')}</p>
                        <span><b> {postDeliveryDetails?.receiver?.name?.first_name || ''} {postDeliveryDetails?.receiver?.name?.middle_name || ''} {postDeliveryDetails?.receiver?.name.last_name || ''}</b>
                        </span>
                    </div>

                    <div className="d-flex justify-content-between info px-24">
                        <p>{payoutLocationText()}</p>
                        <span><b>{getCountryName(countries, postDeliveryDetails?.receiver?.address.country_iso_code)}</b>
                        </span>
                    </div>
                    <p  className="px-24">
                        {postDeliveryDetails?.receiver?.address.city &&
                            <div className="d-flex justify-content-between info">
                                <p>{t('PAYOUT_CITY')}</p>
                                <span><b>{postDeliveryDetails?.receiver?.address.city}</b>
                                </span>
                            </div>
                        }
                        {postDeliveryDetails?.receiver?.address.state &&
                            <div className="d-flex justify-content-between info">
                                <p>{t('PAYOUT_STATE')}</p>
                                <span><b>{postDeliveryDetails?.receiver?.address.state}</b>
                                </span>
                            </div>
                        }
                        {postDeliveryDetails?.payment_details &&
                        <TransactionDetails
                            receiverData={ postDeliveryDetails?.receiver }
                            wu_product={ postDeliveryDetails?.wu_product }
                            payment={ postDeliveryDetails?.payment_details }
                        />}
                        {getParseHtmlArticle('wu_117')}
                    </p>
                    <p className="box-shadow px-24">
                        {getParseHtmlArticle('wu_114')}
                        <div className="confirm_btn d-flex my-3">
                            <Button className="mr-2" onClick={ editDetails } >{t('EDIT_DETAILS')}</Button>
                            <Button outlined type='submit'>{t('CONFIRM_SEND')}</Button>
                        </div>
                    </p>
                    <p className="px-24 pt-4">
                        {getParseHtmlArticle('wu_115')}
                        {getParseHtmlArticle('wu_111')}
                    </p>
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