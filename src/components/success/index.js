import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../shared/Footer.styled'
import { getCountryName, getParseHtmlArticle } from 'utils/helpers'
import SenderDetails from 'components/transactionDetails/transactionHistory/senderDetails'
import BorderTitle from 'components/shared/BorderTitle.styled';
import { useTranslation } from 'react-i18next';

const Success = () => {
    const { t } = useTranslation()
    const postDeliveryDetails = useSelector((state) => state.receiver.postDeliveryData)
    const countries = useSelector((state) => state.receiver.countries)

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

    return (
        <Card>
            <div>
                <h3>{t('SUCCESS')}</h3>
                {getParseHtmlArticle('wu_130')}
                <BorderTitle smallText className="mt-4">{t('TRACKING_INFO')}</BorderTitle>
                <div className="d-flex justify-content-between info">
                    <p>{t('TRACKING_NUMBER')}</p>
                    <span><b>##########</b></span>
                </div>
                <span>{getParseHtmlArticle('wu_134')}</span>

                <BorderTitle smallText className="mt-4">{t('TRANSACTION_DETAILS')}</BorderTitle>
                <div className="d-flex justify-content-between info">
                    <p>{t('DATE_OF_TRANSACTION')}</p>
                    <span><b>-----</b>
                    </span>
                </div>

                <div className="d-flex justify-content-between info">
                    <p>{t('TIME_OF_TRANSACTION')}</p>
                    <span><b>-----</b>
                    </span>
                </div>

                <div className="d-flex justify-content-between info">
                    <p>{t('MY_WU_NUMBER')}</p>
                    <span><b>-----</b>
                    </span>
                </div>

                <div className="d-flex justify-content-between info">
                    <p>{t('TOTAL_POINTS')}</p>
                    <span><b>-----</b>
                    </span>
                </div>

                {postDeliveryDetails?.sender && <SenderDetails sender={ postDeliveryDetails?.sender } />}

                <BorderTitle smallText className="mt-4">{t('FINAL_RECEIVER')}</BorderTitle>
                <div className="d-flex justify-content-between info">
                    <p>{t('NAME_TEXT')}</p>
                    <span><b> {postDeliveryDetails?.receiver?.name?.first_name || ''} {postDeliveryDetails?.receiver?.name?.middle_name || ''} {postDeliveryDetails?.receiver?.name.last_name || ''}</b>
                    </span>
                </div>

                <div className="d-flex justify-content-between info">
                    <p>{payoutLocationText()}</p>
                    <span><b>{getCountryName(countries, postDeliveryDetails?.receiver?.address.country_iso_code)}</b>
                    </span>
                </div>
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
                    <span>------</span>
                </div>
                <div className="d-flex justify-content-between info">
                    <p>{t('TRANSFER_AMOUNT')}</p>
                    <span>-------</span>
                </div>
                <div className="d-flex justify-content-between info-heading mt-3">
                    <h4 >{t('TOTAL_TO_RECEIVER')}</h4>
                    <span>-------</span>
                </div>
                <div className="d-flex justify-content-between info-heading">
                    <h4>{t('TOTAL')}</h4>
                    <span>-------</span>
                </div>
                {getParseHtmlArticle('wu_117')}
                {getParseHtmlArticle('wu_127')}
                {getParseHtmlArticle('wu_121')}
                {getParseHtmlArticle('wu_115')}
                {getParseHtmlArticle('wu_122')}
                {postDeliveryDetails?.sender?.address?.state === 'CA' && getParseHtmlArticle('wu_104')}
                {postDeliveryDetails?.receiver?.address?.country_iso_code==='US' &&
                postDeliveryDetails?.sender.address.state ==='TX' &&
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