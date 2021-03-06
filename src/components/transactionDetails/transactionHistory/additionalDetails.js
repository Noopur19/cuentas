import React,{ useState } from 'react'
import { getLocalDataMyWuNumber } from 'utils/helpers'
import PropTypes from 'prop-types';
import moment from 'moment'
import { useSelector } from 'react-redux'
import { getCurrencySymbol, getTransactionStatus } from 'utils/helpers';
import BorderTitle from '../../shared/BorderTitle.styled'
import historyIcon from '../../../images/historyIcon.png'
import { AdditionalDetailWrap } from './transactionHistory.styled'
import { useTranslation } from 'react-i18next';

const AdditionalDetails = (props) => {
    const { t } = useTranslation()

    const { transactions } = props;

    const [ isOpen, setIsOpen ] = useState(false);
    const myWUNumber  = getLocalDataMyWuNumber()
    const enquiry = useSelector((state) => state.transactionHistory.enquiryDetails)
    const parsedReceiver = transactions && JSON.parse(transactions?.additional_properties?.receiver?.value)
    const dateTime = transactions && JSON.parse(transactions?.additional_properties?.transaction_response?.value).response?.date_time
    const date = dateTime && (dateTime.split('T')[ 0 ]).trim();
    const time = dateTime && dateTime.substring(dateTime.indexOf('T') + 1)
    const formattedDate = moment(date).format('DD MMMM, YYYY')
    const formattedTime =  moment(time, 'hh:mm:ss').format('hh:mm A');
    const currencyCode = transactions && JSON.parse(transactions.additional_properties?.payment_details?.value).origination?.currency_iso_code
    const amountPaid = transactions && transactions?.additional_properties?.amount?.value

    const toggleModal = () => {
        getTransactionStatus(enquiry?.transaction_status) === `${ t('CANCEL_TEXT') }` ?
            setIsOpen(!isOpen) : setIsOpen(isOpen) ;
    }

    return (
        <>
            <AdditionalDetailWrap className="additionalDetails">
                <BorderTitle><h3>{t('ADDITIONAL_DETAILS')}
                    <span className="underline"></span></h3>
                </BorderTitle>
                <div className="header-card d-none">
                    <div className="amount-paid">
                        <h2>{t('AMOUNT_PAID')}</h2>
                        <span> {'-'} {getCurrencySymbol(currencyCode)}{(+amountPaid).toFixed(2) || ''}</span>
                        <p onClick={ () => toggleModal() }>{getTransactionStatus(enquiry?.transaction_status)}</p>
                    </div>
                    <div className="amount-img">
                        <img className="img-fluid" src={ historyIcon } alt="history-icon" />
                        <p>{formattedDate} | {moment(time, 'hh:mm:ss').format('hh:mm')}</p>
                    </div>
                </div>
                <div className="additionalDetailsCard">
                    <div className="d-flex justify-content-between info">
                        <p>{t('AMOUNT_PAID')}</p>
                        <span className="price"> {'-'}{getCurrencySymbol(currencyCode)}{(+amountPaid).toFixed(2) || ''}</span>
                    </div>
                    <div className="d-flex justify-content-between info">
                        <p>{t('TRANSFER_TO')}</p>
                        <span>{parsedReceiver?.name?.first_name || ''}
                            {parsedReceiver?.name?.middle_name || ''}
                            {parsedReceiver?.name?.last_name || ''}
                            {parsedReceiver?.name?.given_name || ''}
                            {parsedReceiver?.name?.paternal_name || ''}
                            {parsedReceiver?.name?.maternal_name || ''}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between info">
                        <p>{t('DETAILS')}</p>
                        <span> {transactions?.invoice_number}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between info">
                        <p>{t('TRACKING_NUMBER')}</p>
                        <span>(MTCN) {transactions?.additional_properties?.mtcn?.value}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between info">
                        <p>{t('DATE_OF_TRANSACTION')}</p>
                        <span>{formattedDate}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between info">
                        <p>{t('TIME_OF_TRANSACTION')}</p>
                        <span>{formattedTime}</span>
                    </div>
                    {myWUNumber &&
                    <div className="d-flex justify-content-between info">
                        <p>{t('MY_WU_NUMBER')}</p>
                        <span>{myWUNumber}
                        </span>
                    </div>}
                    {transactions?.additional_properties?.total_points?.value &&
                        <div className="d-flex justify-content-between info">
                            <p>{t('TOTAL_POINTS')}</p>
                            <span>{transactions?.additional_properties?.total_points?.value}</span>
                        </div>
                    }
                </div>
            </AdditionalDetailWrap> </>
    )
}

AdditionalDetails.propTypes = {
    transactions: PropTypes.object,
    receiver: PropTypes.object,
    sender: PropTypes.object,
    mtcn: PropTypes.number
};

export default AdditionalDetails
