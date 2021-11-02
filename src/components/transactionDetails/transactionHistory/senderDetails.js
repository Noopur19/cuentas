import React from 'react'
import PropTypes from 'prop-types';
import BorderTitle from '../../shared/BorderTitle.styled'
import { useTranslation } from 'react-i18next';

const SenderDetails = (props) => {
    const { t } = useTranslation()
    const { transactions,  sender  } = props;
    const parsedSender = sender ||  transactions?.additional_properties?.sender?.value && JSON.parse(transactions?.additional_properties?.sender?.value)

    return (
        <div className="sender-info">
            <BorderTitle smallText className="mt-4">{t('SENDER_INFO')}</BorderTitle>
            <div className="d-flex justify-content-between info">
                <p>{t('NAME_TEXT')}</p>
                <span><b>{parsedSender.name.first_name || ''} {parsedSender.name.middle_name || ''} {parsedSender.name.last_name || ''}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{t('PAY_FROM_ACCOUNT')}</p>
                <span><b>{parsedSender.bank_account.name}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{t('SENDER_CITY')}</p>
                <span><b>{parsedSender.address.city}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{t('SENDER_STATE')}</p>
                <span><b>{parsedSender.address.state}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{t('SENDER_ZIP_CODE')}</p>
                <span><b>{parsedSender.address.postal_code}</b></span>
            </div>
            <div className="d-flex justify-content-between info">
                <p>{t('SENDER_PHONE')}</p>
                <span><b>{parsedSender.contact_phone}</b></span>
            </div>
        </div>
    )
}

SenderDetails.propTypes = {
    transactions: PropTypes.object,
    sender: PropTypes.object
};

export default SenderDetails
