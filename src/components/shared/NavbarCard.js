import React, { useState } from 'react'
import { HeaderCard } from './Navbar.styled';
import { useDispatch, useSelector } from 'react-redux'
import historyIcon from '../../images/historyIcon.png';
import { getCurrencySymbol, getTransactionStatus } from 'utils/helpers';
import moment from 'moment'
import Modal from 'components/shared/Modal';
import { postCancelTransaction } from 'middleware/transactionDetails';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const NavbarCard = () => {
    const { t } = useTranslation();
    const [ isOpen, setIsOpen ] = useState(false);
    const dispatch = useDispatch()
    const transactions = useSelector((state) => state.transactionHistory?.invoices)
    const enquiry = useSelector((state) => state.transactionHistory?.enquiryDetails)
    const invoice = useSelector((state) => state.transactionHistory.invoiceDetails)
    const filteredTransaction = invoice
    const receiver = filteredTransaction && JSON.parse(filteredTransaction?.additional_properties.receiver.value)
    const sender = filteredTransaction && JSON.parse(filteredTransaction?.additional_properties.sender.value)
    const mtcn = filteredTransaction?.additional_properties.mtcn.value
    const currencyCode = filteredTransaction &&  JSON.parse(filteredTransaction?.additional_properties?.payment_details?.value).origination?.currency_iso_code
    const dateTime = filteredTransaction && JSON.parse(filteredTransaction?.additional_properties?.transaction_response?.value).response.date_time
    const date = (dateTime && dateTime.split('T')[ 0 ])?.trim();
    const time = dateTime && dateTime.substring(dateTime.indexOf('T') + 1)
    const formattedDate = moment(date).format('DD MMMM,YYYY')

    const toggleModal = () => {
        getTransactionStatus(enquiry?.transaction_status) === `${ t('CANCEL_TEXT') }` ?
            setIsOpen(!isOpen) : setIsOpen(isOpen) ;
    }

    const cancelTransData = {
        'amount': filteredTransaction?.additional_properties?.amount?.value || null,
        'invoiceId': filteredTransaction?.id || null,
        'transactionId': filteredTransaction?.additional_properties?.transaction_id?.value || null,
        'mtcn': filteredTransaction?.additional_properties?.mtcn?.value || null,
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
                <h4>(MTCN){transactions?.additional_properties?.mtcn.value}</h4>
                <h5>{t('CANCEL_CONFIRMATION')}</h5>
            </Modal>
        )
    }

    return (
        <HeaderCard className="header-card">
            <div className="amount-paid">
                <h2>{t('AMOUNT_PAID')}</h2>
                <span>{getCurrencySymbol(currencyCode)} {filteredTransaction?.additional_properties?.amount?.value}</span>
                <p onClick={ () => toggleModal() }>{getTransactionStatus(enquiry?.transaction_status)}</p>
            </div>
            <div className="amount-img">
                <img className="img-fluid" src={ historyIcon } alt="history-icon" />
                {renderModal()}
                <p>{formattedDate} | {moment(time, 'hh:mm:ss').format('hh:mm')}</p>
            </div>
        </HeaderCard>
    )
}

NavbarCard.propTypes = {
    match: PropTypes.object,
}

export default NavbarCard