import React from 'react'
import PropTypes from 'prop-types';

const TransactionDetails = (props) => {
    const { transactions } = props;
    const parsedServiceType = JSON.parse(transactions.additional_properties.wu_product.value)

    return (
        <div>
            <h3>Transaction Details -------------</h3>
            <div>Service type----{parsedServiceType.name} </div>
            <div>Transfer amount---- {transactions.additional_properties.amount.value}</div>
            <div>Transfer fees---- </div>
            <div>Additional fees----</div>
            <div>Transfer taxes---- </div>
            <div>Promotional discount---- </div>
            <div>Other fees</div>
            <h4>Total to Final Receiver {transactions.additional_properties.amount.value}</h4>
            <h4>Total</h4>
            <div>----------------------------</div>
        </div>
    )
}

TransactionDetails.propTypes = {
    transactions: PropTypes.object,
};

export default TransactionDetails
