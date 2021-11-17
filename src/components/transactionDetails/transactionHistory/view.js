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
import { getAllCountries } from 'middleware/receiver'
import _ from 'lodash'

const TransactionHistoryDetails = (props) => {
    const dispatch = useDispatch();
    const invoice = useSelector((state) => state.transactionHistory.invoiceDetails)
    const receiver = invoice && JSON.parse(invoice?.additional_properties?.receiver?.value)
    const sender = invoice && JSON.parse(invoice?.additional_properties?.sender?.value)
    const mtcn = invoice && invoice?.additional_properties?.mtcn?.value
    const countries = useSelector((state) => state.receiver.countries )

    useEffect(() => {
        props.match.params.id && dispatch(getInvoiceDetails(props.match.params.id))
        _.isEmpty(countries) && dispatch(getAllCountries())
    }, [])
    useEffect(() => {
        invoice && dispatch(postTransactionEnquiry(receiver,sender,mtcn))
    }, [ invoice ])

    return (
        <Card className="transactionHistoryDetail pb-0">
            <AdditionalDetails
                transactions={ invoice }
                receiver={ receiver }
                sender={ sender }
                mtcn={ mtcn }
            />
            <HistoryDetail className="historyWrapper">
                <SenderDetails transactions={ invoice } countries={ countries } />
                <ReceiverDetails transactions={ invoice } countries={ countries }/>
                <TransactionDetails transactions={ invoice }/>
            </HistoryDetail>
        </Card>
    )
}

TransactionHistoryDetails.propTypes = {
    match: PropTypes.object,
};

export default TransactionHistoryDetails
