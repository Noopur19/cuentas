import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash'
import { getCurrencySymbol } from 'utils/helpers';

const TransactionDetails = (props) => {
    const { transactions } = props;
    const parsedServiceType = JSON.parse(transactions.additional_properties.wu_product.value)
    const paymentDetails = JSON.parse(transactions.additional_properties.payment_details.value)
    const receiver = JSON.parse(transactions.additional_properties.receiver.value)
    const dfDetails = JSON.parse(transactions.additional_properties.df_details.value)
    const currencyCode = _.get(paymentDetails,'origination.currency_iso_code')
    const receiverCurrencyCode = _.get(paymentDetails,'destination.currency_iso_code')

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
        return parseInt(promotionDiscount) > 0 ? parseInt(promotionDiscount) / 100 : 0;
    };

    const getPayoutAmount = () => {
        const payoutAmount = _.get(paymentDetails,'destination.expected_payout_amount');
        return parseInt(payoutAmount) > 0 ? parseInt(payoutAmount) / 100 : 0
    };

    const getExchangeRate = () => {
        const rate = _.get(paymentDetails,'exchange_rate');
        return  getCurrencySymbol(currencyCode) +
        ` 1 ${ currencyCode } =` +
        getCurrencySymbol(currencyCode) +
        `${ rate }` +
        `(${ receiverCurrencyCode })`
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
            <div>Transfer amount---- {getCurrencySymbol(currencyCode)} {getPrincipalAmount()} {`(${ currencyCode })`}</div>
            <div>Transfer fees---- +{getCurrencySymbol(currencyCode)} {getTransferFee()} {`(${ currencyCode })`}</div>
            <div>Additional fees----{getCurrencySymbol(currencyCode)} {0} {`(${ currencyCode })`}</div>
            <div>Transfer taxes---- +{getCurrencySymbol(currencyCode)} {getTotalTaxes()} {`(${ currencyCode })`}</div>
            <div>Promotional discount----  -{getCurrencySymbol(currencyCode)} {getPromotionalDiscount()} {`(${ currencyCode })`}</div>
            <div>Other fees---- {getCurrencySymbol(currencyCode)} {getOtherFee()} {`(${ currencyCode })`}</div>
            {receiver.address.country_iso_code !== 'US' && <div>Exchange Rate {getExchangeRate()}</div>}
            <div>Transfer amount---- {getCurrencySymbol(receiverCurrencyCode)} {getPayoutAmount()} {`(${ receiverCurrencyCode })`}</div>
            <h4>Total to Final Receiver {getCurrencySymbol(receiverCurrencyCode)} {getPayoutAmount()} {`(${ receiverCurrencyCode })`}</h4>
            <h4>Total -{getCurrencySymbol(currencyCode)} {getTotalAmount()} {`(${ currencyCode })`}</h4>
            <div>----------------------------</div>
        </div>
    )
}

TransactionDetails.propTypes = {
    transactions: PropTypes.object,
};

export default TransactionDetails
