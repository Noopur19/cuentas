import React from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { getCountryName } from 'utils/helpers'

const ReceiverDetails = (props) => {
    const { transactions } = props;
    const countries = useSelector((state) => state.receiver.countries )

    const parsedReceiver = JSON.parse(transactions.additional_properties.receiver.value)

    return (
        <div>
            <h3>Final Receiver -------------</h3>
            <div>Name----{ parsedReceiver.name.first_name } { parsedReceiver.name.last_name }</div>
            <div>Payout Location----{getCountryName(countries, parsedReceiver.address.country_iso_code)}</div>
            <div>Payout City---- { parsedReceiver.address.city }</div>
            <div>Payout State---- { parsedReceiver.address.state }</div>
            <h3>Receiver Information --------</h3>
            <div>Pay from Account----{ 'Associate Checking'}</div>
            <div>Payout Country----{getCountryName(countries, parsedReceiver.address.country_iso_code)}</div>
        </div>
    )
}

ReceiverDetails.propTypes = {
    transactions: PropTypes.object,
};

export default ReceiverDetails
