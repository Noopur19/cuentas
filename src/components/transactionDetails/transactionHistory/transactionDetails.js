/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash'
import { getCurrencySymbol } from 'utils/helpers';
import { getParseHtmlArticle } from 'utils/helpers'
import BorderTitle from '../../shared/BorderTitle.styled'
import CardFooter  from '../../shared/CardFooter';
import { useTranslation } from 'react-i18next';
import { Transaction } from './transactionHistory.styled'
import { useSelector } from 'react-redux'

const TransactionDetails = (props) => {
    const { t } = useTranslation()
    const { transactions,receiverData, payment, wu_product } = props;
    const parsedServiceType = wu_product || transactions && JSON.parse(transactions?.additional_properties?.wu_product?.value)
    const paymentDetails = payment || transactions && JSON.parse(transactions?.additional_properties?.payment_details?.value)
    const receiver = receiverData || transactions&& JSON.parse(transactions?.additional_properties?.receiver?.value)
    const dfDetails = transactions && JSON.parse(transactions?.additional_properties?.df_details?.value) || {}
    const currencyCode = _.get(paymentDetails,'origination.currency_iso_code')
    const receiverCurrencyCode = _.get(paymentDetails,'destination.currency_iso_code')
    const postDeliveryDetails = useSelector((state) => state.receiver.postDeliveryData)

    const getTransferAmountText = () => {
        if (postDeliveryDetails?.payment_details?.fix_on_send === 'N') {
            return  t('ESTIMATED_TRANSFER_AMOUNT')
        } else {
            return  t('TRANSFER_AMOUNT')
        }
    }

    const getTotalToReceiverText = () => {
        if (postDeliveryDetails?.payment_details?.fix_on_send === 'N') {
            return  t('ESTIMATED_TOTAL_TO_RECEIVER')
        } else {
            return  t('TOTAL_TO_RECEIVER')
        }
    }

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
        const rate = (_.get(paymentDetails,'exchange_rate'));
        return  rate && getCurrencySymbol(currencyCode) +
        `1 ${ currencyCode } = ` +
        getCurrencySymbol(receiverCurrencyCode) +
        `${ rate }` +
        `(${ receiverCurrencyCode })`
    };

    const getExchangeRateText = () => {
        if (postDeliveryDetails?.payment_details?.fix_on_send === 'N') {
            return  t('ESTIMATED_EXCHANGE_RATE')
        } else {
            return  t('EXCHANGE_RATE')
        }
    }

    const getGrossAmount = () => {
        const grossAmount = _.get(paymentDetails,'origination.gross_amount');
        return parseInt(grossAmount) > 0 ? parseInt(grossAmount) / 100 : 0
    };

    return (
        <Transaction className="transactional-details-wrap">
            <BorderTitle smallText className="mt-4"><h3>{t('TRANSACTION_DETAILS')}
                <span className="underline"></span></h3>
            </BorderTitle>
            <div className="d-flex justify-content-between info">
                <p>{t('SERVICE_TYPE')}</p>
                <span>{parsedServiceType?.name}</span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{getTransferAmountText()}</p>
                <span>{getCurrencySymbol(currencyCode)}{getPrincipalAmount().toFixed(2)} {`(${ currencyCode })`}</span></div>
            <div className="d-flex justify-content-between info">
                <p>{t('TRANSFER_FEES')}</p>
                <span>+{getCurrencySymbol(currencyCode)}{getTransferFee().toFixed(2)} {`(${ currencyCode })`}</span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{t('ADDITIONAL_FEES')}</p>
                <span>+{getCurrencySymbol(currencyCode)}{(0).toFixed(2)} {`(${ currencyCode })`}</span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{t('TRANSFER_TAXES')}</p>
                <span>+{getCurrencySymbol(currencyCode)}{getTotalTaxes().toFixed(2)} {`(${ currencyCode })`}</span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{t('PROMOTION_DISCOUNT')}</p>
                <span>-{getCurrencySymbol(currencyCode)}{getPromotionalDiscount().toFixed(2)} {`(${ currencyCode })`}</span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{t('OTHER_FEES')}</p>
                <span>+{getCurrencySymbol(currencyCode)}{getOtherFee().toFixed(2)} {`(${ currencyCode })`}</span>
            </div>
            {receiver?.address?.country_iso_code !== 'US' &&
            <div className="d-flex justify-content-between info">
                <p>{getExchangeRateText()} </p>
                <span>{getExchangeRate()}</span>
            </div>}
            <div className="d-flex justify-content-between info">
                <p>{getTransferAmountText()}</p>
                <span>{getCurrencySymbol(receiverCurrencyCode)}{getPayoutAmount().toFixed(2)} {`(${ receiverCurrencyCode })`}</span>
            </div>
            <div className="d-flex justify-content-between info-heading mt-3">
                <h4 >{getTotalToReceiverText()} </h4>
                <span className="text-right">{getCurrencySymbol(receiverCurrencyCode)}{getPayoutAmount().toFixed(2)} {`(${ receiverCurrencyCode })`}
                </span>
            </div>
            <div className="d-flex justify-content-between info-heading">
                <h4>{t('TOTAL')}</h4>
                <span className="text-right">{getCurrencySymbol(currencyCode)}{getGrossAmount().toFixed(2)} {`(${ currencyCode })`}</span>
            </div>
            {!payment && <>
                <div className="article">
                    { getParseHtmlArticle('wu_111') }
                    { getParseHtmlArticle('wu_109') }
                </div>
                <CardFooter></CardFooter>
            </>
            }
        </Transaction>
    )
}

TransactionDetails.propTypes = {
    transactions: PropTypes.object,
    receiverData: PropTypes.object,
    payment: PropTypes.object,
    wu_product: PropTypes.object,
};

export default TransactionDetails
