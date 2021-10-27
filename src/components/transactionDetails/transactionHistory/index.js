import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactionHistory } from 'middleware/transactionDetails'
import history from 'utils/history'
import moment from 'moment'
import { Card } from '../../shared/Footer.styled'
import _ from 'lodash'
import { getCurrencySymbol } from 'utils/helpers'

const TransactionHistory = () => {
    const dispatch = useDispatch()
    const transactions = useSelector((state) => state.transactionHistory.invoices)

    const onClickHandler = (invoices) => {
        history.push(`/transaction-history-details/${ invoices.id }`)
    }

    const renderCard = () => {
        return transactions && transactions?.content?.map((invoices) => {
            const mtcnDate = invoices.additional_properties.mtcn_date_time.value;
            const time = mtcnDate.substring(mtcnDate.indexOf('T') + 1)
            const formattedTime =  moment(time, 'hh:mm:ss').format('hh:mm A');
            const currencyCode = JSON.parse(invoices.additional_properties.payment_details.value).origination.currency_iso_code

            return invoices?.items?.map((invoice) => {
                return (
                    <div key="" onClick={ () => onClickHandler(invoices) }>
                        <div>Name {invoice.item_name} </div>
                        <div>Invoice Id {invoice.invoice_id} </div>
                        <div>Status {invoice.current_fulfillment_status}</div>
                        <div>Unit Price -{getCurrencySymbol(currencyCode)} {invoice.unit_price}</div>
                        <div>{formattedTime}</div>
                        <div>-----------------------</div>
                    </div>
                )
            })
        })
    }

    useEffect(async () => {
        _.isEmpty(transactions) && await dispatch(getTransactionHistory())
    }, [])

    return (
        <Card>
            <div>
                <h3>My WU History</h3>
                {renderCard()}
            </div>
        </Card>
    )
}

export default TransactionHistory
