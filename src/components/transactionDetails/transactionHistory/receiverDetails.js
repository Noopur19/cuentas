import React from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { getCountryName } from 'utils/helpers'
import BorderTitle from '../../shared/BorderTitle.styled'
import { useTranslation } from 'react-i18next';

const ReceiverDetails = (props) => {
    const { t } = useTranslation()

    const { transactions } = props;
    const countries = useSelector((state) => state.receiver.countries )
    const parsedReceiver = transactions && JSON.parse(transactions?.additional_properties?.receiver?.value)
    const paymentDetails = transactions && JSON.parse(transactions?.additional_properties?.payment_details?.value)?.fix_on_send

    const payoutLocationText =  () => {
        if(parsedReceiver?.address?.country_iso_code !== 'US') {
            if(paymentDetails === 'N') {
                return t('EXPECTED_FOREIGN_COUNTRY_PAYOUT_LOCATION')
            } else {
                return  t('FOREIGN_COUNTRY_PAYOUT_LOCATION')
            }
        } else if(paymentDetails === 'N') {
            return t('EXPECTED_COUNTRY_PAYOUT_LOCATION')
        } else {
            return t('COUNTRY_PAYOUT_LOCATION')
        }
    }

    return (
        <div className="final-receiver">
            <BorderTitle smallText className="mt-4"><h3>{t('FINAL_RECEIVER')}
                <span className="underline"></span></h3>
            </BorderTitle>

            <div className="d-flex justify-content-between info">
                <p>{t('NAME_TEXT')}</p>
                <span><b> { parsedReceiver?.name?.first_name || '' } { parsedReceiver?.name?.middle_name || ''} { parsedReceiver?.name?.last_name || ''}</b>
                </span>
            </div>

            <div className="d-flex justify-content-between info">
                <p>{payoutLocationText()}</p>
                <span><b>{getCountryName(countries, parsedReceiver?.address?.country_iso_code)}</b>
                </span>
            </div>
            {parsedReceiver?.address?.city &&
                <div className="d-flex justify-content-between info">
                    <p>{t('PAYOUT_CITY')}</p>
                    <span><b>{ parsedReceiver?.address?.city }</b>
                    </span>
                </div>
            }
            {parsedReceiver?.address?.state &&
                <div className="d-flex justify-content-between info">
                    <p>{t('PAYOUT_STATE')} </p>
                    <span><b>{ parsedReceiver?.address?.state }</b>
                    </span>
                </div>
            }
            <BorderTitle smallText className="mt-4"><h3>{t('RECIEVER_INFO')}
                <span className="underline"></span></h3>
            </BorderTitle>

            <div className="d-flex justify-content-between info">
                <p>{t('PAY_FROM_ACCOUNT')}</p>
                <span><b>{ 'Associate Checking'}</b>
                </span>
            </div>

            <div className="d-flex justify-content-between info">
                <p>{t('PAYOUT_COUNTRY')}</p>
                <span><b>{getCountryName(countries, parsedReceiver?.address?.country_iso_code)}</b>
                </span>
            </div>
        </div>
    )
}

ReceiverDetails.propTypes = {
    transactions: PropTypes.object,
};

export default ReceiverDetails
