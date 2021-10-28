import React from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { getCountryName } from 'utils/helpers'
import BorderTitle from '../../shared/BorderTitle.styled'

const ReceiverDetails = (props) => {
    const { transactions } = props;
    const countries = useSelector((state) => state.receiver.countries )
    const parsedReceiver = JSON.parse(transactions.additional_properties.receiver.value)
    const paymentDetails = JSON.parse(transactions.additional_properties.payment_details.value).fix_on_send

    const payoutLocationText =  () => {
        if(parsedReceiver.address.country_iso_code !== 'US') {
            if(paymentDetails === 'N') {
                return 'Expected Foreign Country Payout Location'
            } else {
                return 'Foreign Country Payout Location'
            }
        } else if(paymentDetails === 'N') {
            return 'Expected Payout Location'
        } else {
            return 'Payout Location'
        }
    }

    return (
        <div>
            <BorderTitle smallText className="mt-4">Final Receiver</BorderTitle>
            <div>Name----{ parsedReceiver.name.first_name || '' } { parsedReceiver.name.middle_name || ''} { parsedReceiver.name.last_name || ''}</div>
            <div>{payoutLocationText()}----{getCountryName(countries, parsedReceiver.address.country_iso_code)}</div>
            {parsedReceiver.address.city && <div>Payout City---- { parsedReceiver.address.city }</div>}
            {parsedReceiver.address.state && <div>Payout State---- { parsedReceiver.address.state }</div>}
            <BorderTitle smallText className="mt-4">Receiver Information --------</BorderTitle>
            <div>Pay from Account----{ 'Associate Checking'}</div>
            <div>Payout Country----{getCountryName(countries, parsedReceiver.address.country_iso_code)}</div>
        </div>
    )
}

ReceiverDetails.propTypes = {
    transactions: PropTypes.object,
};

export default ReceiverDetails
