import React from 'react'
import PropTypes from 'prop-types';
import BorderTitle from '../../shared/BorderTitle.styled'

const SenderDetails = (props) => {
    const { transactions,  sender  } = props;
    const parsedSender = sender ||  transactions?.additional_properties?.sender?.value && JSON.parse(transactions?.additional_properties?.sender?.value)

    return (
        <div className="sender-info">
            <BorderTitle smallText className="mt-4">Sender Information</BorderTitle>
            <div className="d-flex justify-content-between info">
                <p>Name</p>
                <span><b>{parsedSender.name.first_name || ''} {parsedSender.name.middle_name || ''} {parsedSender.name.last_name || ''}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>Pay from Account</p>
                <span><b>{parsedSender.bank_account.name}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>Sender City</p>
                <span><b>{parsedSender.address.city}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>Sender State</p>
                <span><b>{parsedSender.address.state}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>Sender Zip Code</p>
                <span><b>{parsedSender.address.postal_code}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>Sender Phone</p>
                <span><b>{parsedSender.contact_phone}</b></span>
            </div>
        </div>
    )
}

SenderDetails.propTypes = {
    transactions: PropTypes.object,
    sender: PropTypes.object
};

export default SenderDetails
