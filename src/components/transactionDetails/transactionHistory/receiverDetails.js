import React from 'react'
import PropTypes from 'prop-types';

const ReceiverDetails = (props) => {
    const { transactions } = props;

    const parsedReceiver = JSON.parse(transactions.additional_properties.receiver.value)
    return (
        <div>
            <h3>Final Receiver -------------</h3>
            <div>Name----{ parsedReceiver.name.first_name } { parsedReceiver.name.last_name }</div>
            <div>Payout Location----</div>
            <div>Payout City---- { parsedReceiver.address.city }</div>
            <div>Payout State---- { parsedReceiver.address.state }</div>
            <h3>Receiver Information --------</h3>
            <div>Pay from Account----{ 'Associate Checking'}</div>
            <div>Payout Country----</div>
        </div>
    )
}

ReceiverDetails.propTypes = {
    transactions: PropTypes.object,
};

export default ReceiverDetails
