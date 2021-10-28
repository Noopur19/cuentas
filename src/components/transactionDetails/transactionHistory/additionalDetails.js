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

const AdditionalDetails = (props) => {
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
                <h3>Status: Pending</h3>
                <h4>(MTCN){transactions.additional_properties.mtcn.value}</h4>
                <h5>Would you like to cancel your transaction ?</h5>
            </Modal>
        )
    }

    return (
        <div>
            <button onClick={ () => onClickHandler() }>Send Email</button>
            <h2>Amount Paid {getCurrencySymbol(currencyCode)} { transactions.additional_properties.amount.value }</h2>
            <div onClick={ () => toggleModal() }>{getTransactionStatus(enquiry.transaction_status)}</div>
            {renderModal()}
            <p>{ formattedDate } | {moment(time, 'hh:mm:ss').format('hh:mm')}</p>
            <BorderTitle>Additional Detail</BorderTitle>
            <div>Amount Paid---- {getCurrencySymbol(currencyCode)} { transactions.additional_properties.amount.value }</div>
            <div>Transfer to----
                { parsedReceiver.name.first_name || '' }
                { parsedReceiver.name.middle_name || ''}
                { parsedReceiver.name.last_name || ''}
            </div>
            <div>Details---- { transactions.invoice_number }</div>
            <div>Tracking Number---- (MTCN) { transactions.additional_properties.mtcn.value }</div>
            <div>Date of transaction----{ formattedDate }</div>
            <div>Time of transaction----{ formattedTime }</div>
            <div>My WU number---- {myWUNumber}</div>
            {transactions.additional_properties?.total_points?.value &&
            <div>Total point---- { transactions.additional_properties.total_points.value }</div>}
        </div>
    )
}

AdditionalDetails.propTypes = {
    transactions: PropTypes.object,
    receiver: PropTypes.object,
    sender: PropTypes.object,
    mtcn: PropTypes.number
};

export default AdditionalDetails
