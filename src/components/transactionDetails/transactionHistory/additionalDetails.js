import React from 'react'
import { getLocalData } from 'utils/cache'
import PropTypes from 'prop-types';
import moment from 'moment'

const AdditionalDetails = (props) => {
    const myWUNumber  = getLocalData('myWUNumber')
    const { transactions } = props;

    const parsedReceiver = JSON.parse(transactions.additional_properties.receiver.value)
    const dateTime = JSON.parse(transactions.additional_properties.transaction_response.value).response.date_time
    const date = (dateTime.split('T')[ 0 ]).trim();
    const time = dateTime.substring(dateTime.indexOf('T') + 1)
    const formattedDate = moment(date).format('DD MMM,YYYY')
    const formattedTime =  moment(time, 'hh:mm:ss').format('hh:mm A');

    return (
        <div>
            <h2>Amount Paid { transactions.additional_properties.amount.value }</h2>
            <p>{ formattedDate } | {moment(time, 'hh:mm:ss').format('hh:mm')}</p>
            <h3>Additional Detail-------------</h3>
            <div>Amount Paid---- { transactions.additional_properties.amount.value }</div>
            <div>Transfer to---- { parsedReceiver.name.first_name } { parsedReceiver.name.last_name }</div>
            <div>Details---- { transactions.invoice_number }</div>
            <div>Tracking Number---- (MTCN) { transactions.additional_properties.mtcn.value }</div>
            <div>Date of transaction----{ formattedDate }</div>
            <div>Time of transaction----{ formattedTime }</div>
            <div>My WU number---- {myWUNumber}</div>
            <div>Total point---- { transactions.additional_properties.total_points.value }</div>
        </div>
    )
}

AdditionalDetails.propTypes = {
    transactions: PropTypes.object,
};

export default AdditionalDetails
