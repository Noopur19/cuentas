import React,{ useState } from 'react'
import { getLocalData } from 'utils/cache'
import PropTypes from 'prop-types';
import moment from 'moment'
import { useSelector,useDispatch } from 'react-redux'
import { getCurrencySymbol, getTransactionStatus } from 'utils/helpers';
import {
    postSendEmail,
    postCancelTransaction ,
} from 'middleware/transactionDetails';
import Modal from 'components/shared/Modal';
import BorderTitle from '../../shared/BorderTitle.styled'
import historyIcon from '../../../images/historyIcon.png'
import { AdditionalDetailWrap } from './transactionHistory.styled'
import { useTranslation } from 'react-i18next';

const AdditionalDetails = (props) => {
    const { t } = useTranslation()

    const { transactions, receiver, sender, mtcn } = props;
    const dispatch = useDispatch()

    const [ isOpen, setIsOpen ] = useState(false);
    const myWUNumber  = getLocalData('myWUNumber')
    const enquiry = useSelector((state) => state.transactionHistory.enquiryDetails)
    const parsedReceiver = JSON.parse(transactions.additional_properties.receiver.value)
    const dateTime = JSON.parse(transactions.additional_properties.transaction_response.value).response.date_time
    const date = (dateTime.split('T')[ 0 ]).trim();
    const time = dateTime.substring(dateTime.indexOf('T') + 1)
    const formattedDate = moment(date).format('DD MMMM,YYYY')
    const formattedTime =  moment(time, 'hh:mm:ss').format('hh:mm A');
    const currencyCode = JSON.parse(transactions.additional_properties?.payment_details?.value).origination?.currency_iso_code

    const cancelTransData = {
        'amount': transactions.additional_properties?.amount?.value || null,
        'invoiceId': transactions?.id || null,
        'transactionId': transactions.additional_properties?.transaction_id?.value || null,
        'mtcn': transactions.additional_properties?.mtcn?.value || null,
    }

    const onClickHandler = () => {
        dispatch(postSendEmail(transactions.id))
    }

    const toggleModal = () => {
        getTransactionStatus(enquiry.transaction_status) === 'Cancel' ?
            setIsOpen(!isOpen) : setIsOpen(isOpen) ;
    }

    const onCancelHandler = () => {
        dispatch(postCancelTransaction(cancelTransData, receiver, sender, mtcn))
        toggleModal()
    }

    const renderModal = () => {
        return (
            <Modal
                show={ isOpen }
                handleClose={ () => toggleModal() }
                handleCancel={ () => onCancelHandler() }
            >
                <h3>{t('STATUS_PENDING')}</h3>
                <h4>(MTCN){transactions.additional_properties.mtcn.value}</h4>
                <p>{t('CANCEL_CONFIRMATION')}</p>

            </Modal>
        )
    }

    return (
        <>
            <button onClick={ () => onClickHandler() }>{t('SEND_EMAIL')}</button>

            <AdditionalDetailWrap className="additionalDetails">
                <BorderTitle>{t('ADDITIONAL_DETAILS')}</BorderTitle>
                <div className="header-card d-none">
                    <div className="amount-paid">
                        <h2>{t('AMOUNT_PAID')}</h2>
                        <span>{getCurrencySymbol(currencyCode)} {transactions.additional_properties.amount.value}</span>
                        <p onClick={ () => toggleModal() }>{getTransactionStatus(enquiry.transaction_status)}</p>
                    </div>
                    <div className="amount-img">
                        <img className="img-fluid" src={ historyIcon } alt="history-icon" />
                        {renderModal()}
                        <p>{formattedDate} | {moment(time, 'hh:mm:ss').format('hh:mm')}</p>
                    </div>
                </div>
                <div className="additionalDetailsCard">
                    <div className="d-flex justify-content-between info">
                        <p>{t('AMOUNT_PAID')}</p>
                        <span className="price">{getCurrencySymbol(currencyCode)} {transactions.additional_properties.amount.value}</span>
                    </div>
                    <div className="d-flex justify-content-between info">
                        <p>{t('TRANSFER_TO')}</p>
                        <span>{parsedReceiver.name.first_name || ''}
                            {parsedReceiver.name.middle_name || ''}
                            {parsedReceiver.name.last_name || ''}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between info">
                        <p>{t('DETAILS')}</p>
                        <span> {transactions.invoice_number}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between info">
                        <p>{t('TRACKING_NUMBER')}</p>
                        <span>(MTCN) {transactions.additional_properties.mtcn.value}
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
                    <div className="d-flex justify-content-between info">
                        <p>{t('MY_WU_NUMBER')}</p>
                        <span>{myWUNumber}
                        </span>
                    </div>
                    {transactions.additional_properties?.total_points?.value &&
                        <div className="d-flex justify-content-between info">
                            <p>{t('TOTAL_POINTS')}</p>
                            <span>{transactions.additional_properties.total_points.value}</span>
                        </div>
                    }
                </div>
            </AdditionalDetailWrap></>
    )
}

AdditionalDetails.propTypes = {
    transactions: PropTypes.object,
    receiver: PropTypes.object,
    sender: PropTypes.object,
    mtcn: PropTypes.number
};

export default AdditionalDetails
