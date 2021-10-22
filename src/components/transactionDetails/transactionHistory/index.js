import React, { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { getTransactionHistory } from 'middleware/transactionDetails'

const TransactionHistory = () => {
    const dispatch = useDispatch()
    const transactions = useSelector((state) => state.transactionHistory.invoices )

    const renderCard = () => {
        return transactions && transactions?.content?.map((invoices) => {
            return invoices?.items?.map((invoice) => {
                return (
                    <>
                        <div>Name {invoice.item_name} </div>
                        <div>Invoice Id {invoice.invoice_id} </div>
                        <div>Status {invoice.current_fulfillment_status}</div>
                        <div>Unit Price {invoice.unit_price}</div>
                        <div>-----------------------</div>
                    </>
                )
            })
        })
    }

    useEffect(async () => {
        await dispatch(getTransactionHistory())
    }, [])

    return (
        <div>
            <h3>My WU History</h3>
            {renderCard()}
        </div>
    )
}

export default TransactionHistory
