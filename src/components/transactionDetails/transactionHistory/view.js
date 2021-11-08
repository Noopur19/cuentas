import React,{ useEffect } from 'react'
import AdditionalDetails from './additionalDetails'
import SenderDetails from './senderDetails'
import ReceiverDetails from './receiverDetails'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import TransactionDetails from './transactionDetails'
import { Card } from '../../shared/Footer.styled'
import { postTransactionEnquiry } from 'middleware/transactionDetails'
import { HistoryDetail } from './transactionHistory.styled'

const TransactionHistoryDetails = (props) => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactionHistory.invoices)
    const filteredTransaction = transactions?.content?.filter((invoices) => invoices.id === +props.match.params.id) [ 0 ];
    const receiver = JSON.parse(filteredTransaction.additional_properties.receiver.value)
    const sender = JSON.parse(filteredTransaction.additional_properties.sender.value)
    const mtcn = filteredTransaction.additional_properties.mtcn.value

    useEffect(() => {
        dispatch(postTransactionEnquiry(receiver,sender,mtcn))
    }, [])

    return (
        <Card className="transactionHistoryDetail pb-0">
            <AdditionalDetails
                transactions={ filteredTransaction }
                receiver={ receiver }
                sender={ sender }
                mtcn={ mtcn }
            />
            <HistoryDetail className="historyWrapper">
                <SenderDetails transactions={ filteredTransaction }/>
                <ReceiverDetails transactions={ filteredTransaction }/>
                <TransactionDetails transactions={ filteredTransaction }/>
            </HistoryDetail>
        </Card>
    )
}

TransactionHistoryDetails.propTypes = {
    match: PropTypes.object,
};

export default TransactionHistoryDetails
