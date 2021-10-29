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
        <div className="final-receiver">
            <BorderTitle smallText className="mt-4">Final Receiver</BorderTitle>

            <div className="d-flex justify-content-between info">
                <p>Name</p>
                <span><b> { parsedReceiver.name.first_name || '' } { parsedReceiver.name.middle_name || ''} { parsedReceiver.name.last_name || ''}</b>
                </span>
            </div>

            <div className="d-flex justify-content-between info">
                <p>{payoutLocationText()}</p>
                <span><b>{getCountryName(countries, parsedReceiver.address.country_iso_code)}</b>
                </span>
            </div>
            {parsedReceiver.address.city &&
                <div className="d-flex justify-content-between info">
                    <p>Payout City</p>
                    <span><b>{ parsedReceiver.address.city }</b>
                    </span>
                </div>
            }
            {parsedReceiver.address.state &&
                <div className="d-flex justify-content-between info">
                    <p>Payout State </p>
                    <span><b>{ parsedReceiver.address.state }</b>
                    </span>
                </div>
            }
            <BorderTitle smallText className="mt-4">Receiver Information</BorderTitle>

            <div className="d-flex justify-content-between info">
                <p>Pay from Account </p>
                <span><b>{ 'Associate Checking'}</b>
                </span>
            </div>

            <div className="d-flex justify-content-between info">
                <p>Payout Country</p>
                <span><b>{getCountryName(countries, parsedReceiver.address.country_iso_code)}</b>
                </span>
            </div>
        </div>
    )
}

ReceiverDetails.propTypes = {
    transactions: PropTypes.object,
};

export default ReceiverDetails
