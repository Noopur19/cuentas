import React from 'react'
import PropTypes from 'prop-types';

const SenderDetails = (props) => {
    const { transactions } = props;
    const parsedSender = JSON.parse(transactions.additional_properties.sender.value)

    return (
        <div>
            <h3>Sender Information --------</h3>
            <div>Name---- {parsedSender.name.first_name} {parsedSender.name.last_name}</div>
            <div>Pay from Account---- {parsedSender.bank_account.name}</div>
            <div>Sender City---- {parsedSender.address.city}</div>
            <div>Sender State---- {parsedSender.address.state}</div>
            <div>Sender Zip Code---- {parsedSender.address.postal_code}</div>
            <div>Sender Phone---- {parsedSender.contact_phone}</div>
        </div>
    )
}

SenderDetails.propTypes = {
    transactions: PropTypes.object,
};

export default SenderDetails
