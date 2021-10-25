import React from 'react'
import AdditionalDetails from './additionalDetails'
import SenderDetails from './senderDetails'
import ReceiverDetails from './receiverDetails'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import TransactionDetails from './transactionDetails'

const TransactionHistoryDetails = (props) => {

    const transactions = useSelector((state) => state.transactionHistory.invoices)
    const filteredTransaction = transactions?.content?.filter((invoices) => invoices.id === +props.match.params.id) [ 0 ];

    return (
        <div>
            <AdditionalDetails transactions={ filteredTransaction }/>
            <SenderDetails transactions={ filteredTransaction }/>
            <ReceiverDetails transactions={ filteredTransaction }/>
            <TransactionDetails transactions={ filteredTransaction }/>
        </div>
    )
}

TransactionHistoryDetails.propTypes = {
    match: PropTypes.object,
};

export default TransactionHistoryDetails
