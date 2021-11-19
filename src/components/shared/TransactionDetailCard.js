import React from 'react'
import { HeaderCard, HeaderCardWrapper } from './Navbar.styled';
import { useSelector } from 'react-redux'
import historyIcon from '../../images/historyIcon.png';
import { getCurrencySymbol, getTransactionStatus } from 'utils/helpers';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { postSendEmail } from 'middleware/transactionDetails';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TransactionDetailCard = (props) => {
    const { toggleModal } = props
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const enquiry = useSelector((state) => state.transactionHistory?.enquiryDetails)
    const invoice = useSelector((state) => state.transactionHistory.invoiceDetails)
    const currencyCode = invoice &&  JSON.parse(invoice?.additional_properties?.payment_details?.value).origination?.currency_iso_code
    const dateTime = invoice && JSON.parse(invoice?.additional_properties?.transaction_response?.value).response.date_time
    const date = (dateTime && dateTime.split('T')[ 0 ])?.trim();
    const time = dateTime && dateTime.substring(dateTime.indexOf('T') + 1)
    const formattedDate = moment(date).format('DD MMMM,YYYY')

    const onClickHandler = () => {
        dispatch(postSendEmail(invoice?.id))
    }

    return (
        <HeaderCardWrapper>
            <HeaderCard className="header-card">
                <div className="amount-paid">
                    <h2>{t('AMOUNT_PAID')}</h2>
                    <span>- {getCurrencySymbol(currencyCode)} {(+invoice?.additional_properties?.amount?.value).toFixed(2) }</span>
                    <p onClick={ () => toggleModal() }>{getTransactionStatus(enquiry?.transaction_status)}</p>
                </div>
                <div className="amount-img">
                    <img className="img-fluid" onClick={ () => onClickHandler() } src={ historyIcon } alt="history-icon" />
                    <p>{formattedDate} | {moment(time, 'hh:mm:ss').format('hh:mm')}</p>
                </div>
            </HeaderCard>
        </HeaderCardWrapper>
    )
}

TransactionDetailCard.propTypes = {
    match: PropTypes.object,
    toggleModal: PropTypes.func
}

export default TransactionDetailCard