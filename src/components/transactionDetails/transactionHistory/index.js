import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactionHistory } from 'middleware/transactionDetails'
import history from 'utils/history'
import moment from 'moment'
import { Card } from '../../shared/Footer.styled'
import _ from 'lodash'
import { getCurrencySymbol } from 'utils/helpers'
import HistoryCard from '../HistoryCard.styled'
import BorderTitle from '../../shared/BorderTitle.styled'
import historyIcon from '../../../images/historyIcon.png'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const TransactionHistory = () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const transactions = useSelector((state) => state.transactionHistory.invoices)

    const onClickHandler = (invoices) => {
        history.push(`/transaction-history/${ invoices.id }`)
    }

    const renderCard = () => {
        return transactions && transactions?.content?.map((invoices) => {
            const mtcnDate = invoices?.additional_properties?.mtcn_date_time?.value;
            const time = mtcnDate?.substring(mtcnDate.indexOf('T') + 1)
            const formattedTime =  moment(time, 'hh:mm:ss').format('hh:mm A');
            const currencyCode = invoices && JSON.parse(invoices?.additional_properties?.payment_details?.value).origination?.currency_iso_code
            const dateTime = invoices && JSON.parse(invoices?.additional_properties?.transaction_response?.value).response?.date_time
            const date = dateTime && (dateTime.split('T')[ 0 ]).trim();
            const formattedDate = date && moment(date).format('DD MMMM,YYYY')
            return invoices?.items?.map((invoice) => {
                return (
                    <HistoryCard key="" onClick={ () => onClickHandler(invoices) } className="history-card">
                        <h5>{ formattedDate }</h5>
                        <div className="card-item">
                            <div className="img-wrapper">
                                <img src={ historyIcon } alt="history-icon"/>
                            </div>
                            <div className="detail">
                                <h6> {invoice?.item_name} </h6>
                                <p className="invoice">{t('INVOICE')} {invoice?.invoice_id}</p>
                                <p className="status">{t('DONE')}</p>
                            </div>
                            <div className="pricing">
                                <h6 className="price">-{getCurrencySymbol(currencyCode)} {(invoice?.unit_price).toFixed(2)}</h6>
                                <p className="time">{formattedTime}</p>
                            </div>
                        </div>
                    </HistoryCard>
                )
            })
        })
    }

    useEffect(async () => {
        _.isEmpty(transactions) && await dispatch(getTransactionHistory(t))
    }, [])

    return (
        <Card className="transaction-card mb-0">
            <div>
                <BorderTitle><h3>{t('MYWU_HISTORY')}
                    <span className="underline"></span></h3>
                </BorderTitle>
                {renderCard()}
            </div>
        </Card>
    )
}

TransactionHistory.propTypes = {
    match: PropTypes.object
};

export default TransactionHistory
