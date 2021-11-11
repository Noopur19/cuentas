import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../shared/Footer.styled'
import { getCountryName, getCurrencySymbol, getParseHtmlArticle } from 'utils/helpers'
import SenderDetails from 'components/transactionDetails/transactionHistory/senderDetails'
import BorderTitle from 'components/shared/BorderTitle.styled';
import { useTranslation } from 'react-i18next';
import moment from 'moment'
import { getLocalData } from 'utils/cache'
import _ from 'lodash'

const Success = () => {
    const { t } = useTranslation()
    const myWUNumber  = getLocalData('myWUNumber')
    const postDeliveryDetails = useSelector((state) => state.receiver.postDeliveryData)
    const confirmDetail = useSelector((state) => state.transactionHistory.confirmDetails)
    const countries = useSelector((state) => state.receiver.countries)
    const dateTime = postDeliveryDetails && postDeliveryDetails?.date_time
    const date = dateTime && (dateTime.split('T')[ 0 ]).trim();
    const time = dateTime && dateTime.substring(dateTime.indexOf('T') + 1)
    const formattedDate = date && moment(date).format('DD MMMM,YYYY')
    const formattedTime = time && moment(time, 'hh:mm:ss').format('hh:mm A');
    const currencyCode = postDeliveryDetails && _.get(postDeliveryDetails.payment_details,'origination.currency_iso_code')
    const receiverCurrencyCode = postDeliveryDetails && _.get(postDeliveryDetails.payment_details,'destination.currency_iso_code')
    const receiverDetail = useSelector((state) => state.receiver.receivers )

    const payoutLocationText = () => {
        if (postDeliveryDetails?.receiver?.address.country_iso_code !== 'US') {
            if (postDeliveryDetails?.paymentDetails?.fix_on_send === 'N') {
                return  t('EXPECTED_FOREIGN_COUNTRY_PAYOUT_LOCATION')
            } else {
                return  t('FOREIGN_COUNTRY_PAYOUT_LOCATION')
            }
        } else if (postDeliveryDetails?.paymentDetails?.fix_on_send === 'N') {
            return t('EXPECTED_COUNTRY_PAYOUT_LOCATION')
        } else {
            return t('COUNTRY_PAYOUT_LOCATION')
        }
    }

    const getTransferFee = () => {
        const fee = postDeliveryDetails &&_.get(postDeliveryDetails?.payment_details,'fees')
        const transferFee = !_.isEmpty(fee)
            ? parseFloat(_.get(fee, 'base_charges', 0)) +
        parseFloat(_.get(fee, 'delivery_charges', 0)) +
        parseFloat(_.get(fee, 'other_charges', 0)) +
        parseFloat(_.get(fee, 'charges', 0))
            : 0;
        return parseInt(transferFee) > 0 ? parseInt(transferFee) / 100 : 0;
    }

    const getTotalTaxes = () => {
        const taxes = postDeliveryDetails &&_.get(postDeliveryDetails?.payment_details, 'taxes');
        const taxAmount = !_.isEmpty(taxes)
            ? parseFloat(_.get(taxes, 'municipal_tax', 0)) +
        parseFloat(_.get(taxes, 'state_tax', 0)) +
        parseFloat(_.get(taxes, 'county_tax', 0))
            : 0;
        return parseInt(taxAmount) > 0 ? parseInt(taxAmount) / 100 : 0;
    };

    const getPrincipalAmount = () => {
        const principalAmount = postDeliveryDetails && _.get(postDeliveryDetails?.payment_details,
            'origination.principal_amount',0);
        return parseInt(principalAmount) > 0 ? parseInt(principalAmount) / 100 : 0;
    };

    const getOtherFee = () => {
        const otherFee = postDeliveryDetails && _.get(postDeliveryDetails?.df_details,'pay_side_charge');
        return parseInt(otherFee) > 0 ? parseInt(otherFee) / 100 : 0;
    };

    const getPromotionalDiscount = () => {
        const promotionDiscount = postDeliveryDetails && _.get(postDeliveryDetails?.payment_details,
            'promotion.discount', 0);
        return parseInt(promotionDiscount) > 0 ? parseInt(promotionDiscount) / 100 : 0;
    };

    const getExchangeRate = () => {
        const rate = postDeliveryDetails && _.get(postDeliveryDetails?.payment_details,'exchange_rate');
        return  getCurrencySymbol(currencyCode) +
        ` 1 ${ currencyCode } =` +
        getCurrencySymbol(currencyCode) +
        `${ rate }` +
        `(${ receiverCurrencyCode })`
    };

    const getPayoutAmount = () => {
        const payoutAmount = postDeliveryDetails && _.get(postDeliveryDetails?.payment_details,'destination.expected_payout_amount');
        return parseInt(payoutAmount) > 0 ? parseInt(payoutAmount) / 100 : 0
    };

    const getTotalAmount = () => {
        if (_.isEmpty(postDeliveryDetails?.payment_details)){
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

    const isDoddFrank = () => {
        const countryCode = postDeliveryDetails && _.get(postDeliveryDetails,'receiver.address.country_iso_code','');
        const principalAmount = postDeliveryDetails && _.get(postDeliveryDetails,'payment_details.origination.principal_amount','');
        if (
            countryCode !== 'US' &&
            countryCode !== 'USA' &&
            principalAmount >= 1501
        ) {
            return true;
        }
        return false;
    };

    const renderWUContactDetails = () => {
        if (isDoddFrank() && postDeliveryDetails?.df_details) {
            const {
                state_agency_name,
                csb_phone1,
                csb_phone2,
                csb_url,
                cfb_phone1,
                cfb_phone2,
                cfb_url,
            } = postDeliveryDetails.df_details;
            return (
                <div>
                    {
                        `${ state_agency_name }`,
                        `${ csb_phone1 }`,
                        `${ csb_phone2 }`,
                        `${ csb_url }`,
                        `${ cfb_phone1 }`,
                        `${ cfb_phone2 }`,
                        `${ cfb_url }`
                    }
                </div>
            );
        } else {
            return null;
        }
    }

    const getTotalPoints = () => {
        const newPointsEarned = confirmDetail && confirmDetail?.new_points_earned
        let totalPoints = newPointsEarned ? newPointsEarned : 0;
        if (myWUNumber && _.get(receiverDetail, 'wu_card.total_points_earned')) {
            totalPoints =
              parseInt(totalPoints) +
              parseInt(_.get(receiverDetail, 'wu_card.total_points_earned'));
        }
        return totalPoints
    }

    return (
        <Card>
            <div>
                <h3>{t('SUCCESS')}</h3>
                {getParseHtmlArticle('wu_130')}
                <BorderTitle smallText className="mt-4"><h3>{t('TRACKING_INFO')}
                    <span className="underline"></span></h3>
                </BorderTitle>
                {confirmDetail && confirmDetail?.money_transfer_control?.mtcn &&
                <div className="d-flex justify-content-between info">
                    <p>{t('TRACKING_NUMBER_MTCN')}</p>
                    <span><b>{confirmDetail?.money_transfer_control?.mtcn}</b></span>
                </div>
                }
                <span>{getParseHtmlArticle('wu_134')}</span>

                <BorderTitle smallText className="mt-4"><h3>{t('TRANSACTION_DETAILS')}
                    <span className="underline"></span></h3>
                </BorderTitle>
                <div className="d-flex justify-content-between info">
                    <p>{t('DATE_OF_TRANSACTION')}</p>
                    <span><b>{formattedDate}</b>
                    </span>
                </div>

                <div className="d-flex justify-content-between info">
                    <p>{t('TIME_OF_TRANSACTION')}</p>
                    <span><b>{formattedTime}</b>
                    </span>
                </div>

                { myWUNumber &&
                <div className="d-flex justify-content-between info">
                    <p>{t('MY_WU_NUMBER')}</p>
                    <span><b>{myWUNumber}</b>
                    </span>
                </div>}

                { getTotalPoints() &&
                <div className="d-flex justify-content-between info">
                    <p>{t('TOTAL_POINTS')}</p>
                    <span><b>{getTotalPoints()}</b>
                    </span>
                </div>}

                {postDeliveryDetails?.sender && <SenderDetails sender={ postDeliveryDetails?.sender } />}

                <BorderTitle smallText className="mt-4"><h3>{t('FINAL_RECEIVER')}
                    <span className="underline"></span></h3>
                </BorderTitle>
                {postDeliveryDetails?.receiver?.name &&
                    <div className="d-flex justify-content-between info">
                        <p>{t('NAME_TEXT')}</p>
                        <span><b> {postDeliveryDetails?.receiver?.name?.first_name || ''} {postDeliveryDetails?.receiver?.name?.middle_name || ''} {postDeliveryDetails?.receiver?.name.last_name || ''}</b>
                        </span>
                    </div>
                }
                {postDeliveryDetails?.receiver?.address.country_iso_code &&
                    <div className="d-flex justify-content-between info">
                        <p>{payoutLocationText()}</p>
                        <span><b>{getCountryName(countries, postDeliveryDetails?.receiver?.address.country_iso_code)}</b>
                        </span>
                    </div>
                }
                {postDeliveryDetails?.receiver?.address.city &&
                    <div className="d-flex justify-content-between info">
                        <p>{t('PAYOUT_CITY')}</p>
                        <span><b>{postDeliveryDetails?.receiver?.address.city}</b>
                        </span>
                    </div>
                }
                {postDeliveryDetails?.receiver?.address.state &&
                <div className="d-flex justify-content-between info">
                    <p>{t('PAYOUT_STATE')}</p>
                    <span><b>{postDeliveryDetails?.receiver?.address.state}</b>
                    </span>
                </div>}
                <div className="d-flex justify-content-between info">
                    <p>{t('EXCHANGE_RATE')} </p>
                    <span>{getExchangeRate()}</span>
                </div>
                <div className="d-flex justify-content-between info">
                    <p>{t('TRANSFER_AMOUNT')}</p>
                    <span>{getCurrencySymbol(receiverCurrencyCode)} {getPayoutAmount().toFixed(2)} {`(${ receiverCurrencyCode })`}</span>
                </div>
                <div className="d-flex justify-content-between info-heading mt-3">
                    <h4 >{t('TOTAL_TO_RECEIVER')}</h4>
                    <span>{getCurrencySymbol(receiverCurrencyCode)} {getPayoutAmount().toFixed(2)} {`(${ receiverCurrencyCode })`}</span>
                </div>
                <div className="d-flex justify-content-between info-heading">
                    <h4>{t('TOTAL')}</h4>
                    <span>-{getCurrencySymbol(currencyCode)} {getTotalAmount().toFixed(2)} {`(${ currencyCode })`}</span>
                </div>
                {getParseHtmlArticle('wu_117')}
                {getParseHtmlArticle('wu_127')}
                {
                    postDeliveryDetails?.receiver?.address?.country_iso_code!=='US' &&
                    postDeliveryDetails?.receiver?.address?.country_iso_code!=='USA' &&
                    +postDeliveryDetails?.payment_details.origination.principal_amount > 1501 &&
                    <>
                        {
                            'For questions or complaints about Western Union, contact:\nSending customer State regulatory name:{0}\nSending customer state regulatory phone #1: {1}\nSending customer state regulatory phone #2: {2}\nState regulatory agency website url: {3}\nConsumer Financial Protection Bureau CFPB phone #1: {4}\nCFPB phone #2: {5}\nCFPB website url: {6}'
                        }
                        { renderWUContactDetails() }
                    </>
                }
                {getParseHtmlArticle('wu_121')}
                {getParseHtmlArticle('wu_115')}
                {getParseHtmlArticle('wu_122')}
                {postDeliveryDetails?.sender?.address?.state === 'CA' && getParseHtmlArticle('wu_104')}
                {
                    postDeliveryDetails?.receiver?.address?.country_iso_code==='US' &&
                    postDeliveryDetails?.sender.address.state ==='TX' &&
                    getParseHtmlArticle('wu_105')
                }
                {
                    postDeliveryDetails?.receiver?.address?.country_iso_code!=='US' &&
                    postDeliveryDetails?.sender.address.state ==='TX' &&
                    +postDeliveryDetails?.payment_details.origination.principal_amount < 1501 &&
                    getParseHtmlArticle('wu_105')
                }
                {getParseHtmlArticle('wu_109')}
                {getParseHtmlArticle('wu_110')}
                {getParseHtmlArticle('wu_111')}
            </div>
        </Card>
    )
}

export default Success