import React,{ useEffect } from 'react'
import AdditionalDetails from './additionalDetails'
import SenderDetails from './senderDetails'
import ReceiverDetails from './receiverDetails'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import TransactionDetails from './transactionDetails'
import { Card } from '../../shared/Footer.styled'
import {  postTransactionEnquiry, getInvoiceDetails } from 'middleware/transactionDetails'
import { HistoryDetail } from './transactionHistory.styled'

const TransactionHistoryDetails = (props) => {
    const dispatch = useDispatch();
    // const transactions = useSelector((state) => state.transactionHistory.invoices)

    const invoice = useSelector((state) => state.transactionHistory.invoiceDetails)

    const receiver = invoice && JSON.parse(invoice?.additional_properties?.receiver?.value)
    const sender = invoice && JSON.parse(invoice?.additional_properties?.sender?.value)
    const mtcn = invoice && invoice?.additional_properties?.mtcn?.value
    // const handleLoad = () => {
    //     history.push('/transaction-history')
    // }
    useEffect(() => {
        dispatch(getInvoiceDetails(props.match.params.id))

    }, [])
    useEffect(() => {
        invoice && dispatch(postTransactionEnquiry(receiver,sender,mtcn))

    }, [ invoice ])
    // useEffect(() => {
    //     window.addEventListener('load', handleLoad);
    //     return () => {
    //         window.removeEventListener('load', handleLoad);
    //     }
    // },[])

    console.log(invoice);

    return (
        <Card className="transactionHistoryDetail pb-0">
            <AdditionalDetails
                transactions={ invoice }
                receiver={ receiver }
                sender={ sender }
                mtcn={ mtcn }
            />
            <HistoryDetail className="historyWrapper">
                <SenderDetails transactions={ invoice }/>
                <ReceiverDetails transactions={ invoice }/>
                <TransactionDetails transactions={ invoice }/>
            </HistoryDetail>
        </Card>
    )
}

TransactionHistoryDetails.propTypes = {
    match: PropTypes.object,
};

export default TransactionHistoryDetails
