import React,{ useEffect, useState } from 'react'
import AdditionalDetails from './additionalDetails'
import SenderDetails from './senderDetails'
import ReceiverDetails from './receiverDetails'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import TransactionDetails from './transactionDetails'
import { Card } from '../../shared/Footer.styled'
import {  postTransactionEnquiry, getInvoiceDetails } from 'middleware/transactionDetails'
import { HistoryDetail } from './transactionHistory.styled'
import { getAllCountries, getAllStates } from 'middleware/receiver'
import _ from 'lodash'
import TransactionDetailCard from 'components/shared/TransactionDetailCard'
import Modal from 'components/shared/Modal';
import { postCancelTransaction } from 'middleware/transactionDetails';
import { useTranslation } from 'react-i18next';
import { getTransactionStatus } from 'utils/helpers'
const TransactionHistoryDetails = (props) => {
    const { t } = useTranslation()

    const dispatch = useDispatch();
    const [ isOpen, setIsOpen ] = useState(false);
    const enquiry = useSelector((state) => state.transactionHistory?.enquiryDetails)
    const invoice = useSelector((state) => state.transactionHistory.invoiceDetails)
    const receiver = invoice && JSON.parse(invoice?.additional_properties?.receiver?.value)
    const sender = invoice && JSON.parse(invoice?.additional_properties?.sender?.value)
    const mtcn = invoice && invoice?.additional_properties?.mtcn?.value
    const countries = useSelector((state) => state.receiver.countries )
    const states = useSelector((state) => state.receiver.states )

    useEffect(() => {
        props.match.params.id && dispatch(getInvoiceDetails(props.match.params.id))
        _.isEmpty(countries) && dispatch(getAllCountries())

    }, [])
    useEffect(() => {
        invoice && dispatch(getAllStates(invoice.shipping_country_name || 'US'))

        invoice && dispatch(postTransactionEnquiry(receiver,sender,mtcn))
    }, [ invoice ])

    const toggleModal = () => {
        getTransactionStatus(enquiry?.transaction_status) === `${ t('CANCEL_TEXT') }` ?
            setIsOpen(!isOpen) : setIsOpen(isOpen) ;
    }

    const cancelTransData = {
        'amount': invoice?.additional_properties?.amount?.value || null,
        'invoiceId': invoice?.id || null,
        'transactionId': invoice?.additional_properties?.transaction_id?.value || null,
        'mtcn': invoice?.additional_properties?.mtcn?.value || null,
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
                leftButtonText={ t('CLOSE_TEXT') }
                rightButtonText={ t('CANCEL_TRANSFER') }
            >
                <h3>{t('STATUS_PENDING')}</h3>
                <h4>(MTCN){invoice?.additional_properties?.mtcn.value}</h4>
                <h5>{t('CANCEL_CONFIRMATION')}</h5>
            </Modal>
        )
    }

    return (
        <>
            <Card className="transactionHistoryDetail pb-0">
                <TransactionDetailCard toggleModal={ toggleModal } />
                <AdditionalDetails
                    transactions={ invoice }
                    receiver={ receiver }
                    sender={ sender }
                    mtcn={ mtcn }
                />
                <HistoryDetail className="historyWrapper">
                    <SenderDetails transactions={ invoice } states={ states } countries={ countries } />
                    <ReceiverDetails transactions={ invoice } countries={ countries }/>
                    <TransactionDetails transactions={ invoice }/>
                </HistoryDetail>
            </Card>
            {renderModal()}

        </>
    )
}

TransactionHistoryDetails.propTypes = {
    match: PropTypes.object,
};

export default TransactionHistoryDetails
