import React, { useState } from 'react'
import { HeaderCard } from './Navbar.styled';
import { useDispatch, useSelector } from 'react-redux'
import historyIcon from '../../images/historyIcon.png';
import { getCurrencySymbol, getTransactionStatus } from 'utils/helpers';
import history from 'utils/history';
import moment from 'moment'
import Modal from 'components/shared/Modal';
import { postCancelTransaction } from 'middleware/transactionDetails';
import PropTypes from 'prop-types';

const NavbarCard = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const dispatch = useDispatch()
    const transactions = useSelector((state) => state.transactionHistory?.invoices)
    const enquiry = useSelector((state) => state.transactionHistory?.enquiryDetails)

    const filteredTransaction = transactions?.content?.filter((invoices) => invoices.id === +history.location.pathname.match(/\d+/g)[ 0 ]) [ 0 ];
    const receiver = JSON.parse(filteredTransaction?.additional_properties.receiver.value)
    const sender = JSON.parse(filteredTransaction?.additional_properties.sender.value)
    const mtcn = filteredTransaction?.additional_properties.mtcn.value
    const currencyCode = JSON.parse(filteredTransaction?.additional_properties?.payment_details?.value).origination?.currency_iso_code
    const dateTime = JSON.parse(filteredTransaction?.additional_properties?.transaction_response?.value).response.date_time
    const date = (dateTime.split('T')[ 0 ]).trim();
    const time = dateTime.substring(dateTime.indexOf('T') + 1)
    const formattedDate = moment(date).format('DD MMMM,YYYY')

    const toggleModal = () => {
        getTransactionStatus(enquiry?.transaction_status) === 'Cancel' ?
            setIsOpen(!isOpen) : setIsOpen(isOpen) ;
    }

    const cancelTransData = {
        'amount': transactions?.additional_properties?.amount?.value || null,
        'invoiceId': transactions?.id || null,
        'transactionId': transactions?.additional_properties?.transaction_id?.value || null,
        'mtcn': transactions?.additional_properties?.mtcn?.value || null,
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
                <h4>(MTCN){transactions?.additional_properties?.mtcn.value}</h4>
                <h5>Would you like to cancel your transaction ?</h5>
            </Modal>
        )
    }

    return (
        <div>
            <HeaderCard className="header-card">
                <div className="amount-paid">
                    <h2>Amount Paid</h2>
                    <span>{getCurrencySymbol(currencyCode)} {filteredTransaction?.additional_properties?.amount?.value}</span>
                    <p onClick={ () => toggleModal() }>{getTransactionStatus(enquiry?.transaction_status)}</p>
                </div>
                <div className="amount-img">
                    <img className="img-fluid" src={ historyIcon } alt="history-icon" />
                    {renderModal()}
                    <p>{formattedDate} | {moment(time, 'hh:mm:ss').format('hh:mm')}</p>
                </div>
            </HeaderCard>
        </div>
    )
}

NavbarCard.propTypes = {
    match: PropTypes.object,
}

export default NavbarCard