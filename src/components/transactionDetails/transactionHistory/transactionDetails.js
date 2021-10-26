import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash'

const TransactionDetails = (props) => {
    const { transactions } = props;
    const parsedServiceType = JSON.parse(transactions.additional_properties.wu_product.value)
    const paymentDetails = JSON.parse(transactions.additional_properties.payment_details.value)
    const dfDetails = JSON.parse(transactions.additional_properties.df_details.value)

    const getTransferFee = () => {
        const fee = _.get(paymentDetails,'fees')
        const transferFee = !_.isEmpty(fee)
            ? parseFloat(_.get(fee, 'base_charges', 0)) +
        parseFloat(_.get(fee, 'delivery_charges', 0)) +
        parseFloat(_.get(fee, 'other_charges', 0)) +
        parseFloat(_.get(fee, 'charges', 0))
            : 0;
        return parseInt(transferFee) > 0 ? parseInt(transferFee) / 100 : 0;
    }

    const getTotalTaxes = () => {
        const taxes = _.get(paymentDetails, 'taxes');
        const taxAmount = !_.isEmpty(taxes)
            ? parseFloat(_.get(taxes, 'municipal_tax', 0)) +
        parseFloat(_.get(taxes, 'state_tax', 0)) +
        parseFloat(_.get(taxes, 'county_tax', 0))
            : 0;
        return parseInt(taxAmount) > 0 ? parseInt(taxAmount) / 100 : 0;
    };

    const getPrincipalAmount = () => {
        const principalAmount = _.get(paymentDetails,
            'origination.principal_amount',0);
        return parseInt(principalAmount) > 0 ? parseInt(principalAmount) / 100 : 0;
    };

    const getOtherFee = () => {
        const otherFee = _.get(dfDetails,'pay_side_charge');
        return parseInt(otherFee) > 0 ? parseInt(otherFee) / 100 : 0;
    };

    const getPromotionalDiscount = () => {
        const promotionDiscount = _.get(paymentDetails,
            'promotion.discount', 0);
        return parseInt(promotionDiscount) > 0
            ? parseInt(promotionDiscount) / 100
            : 0;
    };

    const getTotalAmount = () => {
        if (_.isEmpty(paymentDetails)){
            return 0;
        }
        return (
            getPrincipalAmount() +
            getTransferFee() +
            getTotalTaxes() +
            getOtherFee() -
            getPromotionalDiscount()
        );
    };

    return (
        <div>
            <h3>Transaction Details ----------</h3>
            <div>Service type----{parsedServiceType.name} </div>
            <div>Transfer amount---- {getPrincipalAmount()}</div>
            <div>Transfer fees---- +{getTransferFee()}</div>
            <div>Additional fees----</div>
            <div>Transfer taxes---- +{getTotalTaxes()}</div>
            <div>Promotional discount----  -{getPromotionalDiscount()}</div>
            <div>Other fees---- {getOtherFee()}</div>
            <h4>Total to Final Receiver {getPrincipalAmount()}</h4>
            <h4>Total -{getTotalAmount()}</h4>
            <div>----------------------------</div>
        </div>
    )
}

TransactionDetails.propTypes = {
    transactions: PropTypes.object,
};

export default TransactionDetails
