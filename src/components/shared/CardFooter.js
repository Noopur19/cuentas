import React from 'react';
import LinkText from '../shared/LinkText.styled'
import Link from '../shared/Link.styled'
import footerLogo from '../../images/wu_icon.png'
import CardBottom from '../shared/CardFooter.styled'
import { useTranslation } from 'react-i18next';

import { STATIC_URLS } from 'constants/app'
import { locale } from 'utils/helpers';
const CardFooter = () => {
    const { t } = useTranslation()
    return (
        <>
            <CardBottom className="CardFooter">
                <div className="card-link text-center">
                    <img className="img-fluid my-2" src={ footerLogo } alt="back"/>
                    <LinkText>{t('WU_TEXT')} <Link className="link" bold color="textOrange" onClick={ () => window.open(STATIC_URLS.privacyPolicy(locale())) }  to='#!'>{t('PRIVACY_STATEMENT')}</Link></LinkText>
                    <LinkText>{t('WU_TEXT')} <Link className="link" bold color="textOrange"onClick={ () => window.open(STATIC_URLS.termsAndConditions(locale())) } to={ '#!' } >{t('TERMS_CONDITIONS')}</Link></LinkText>
                    <LinkText>{t('WU_TEXT')} <Link className="link" bold color="textOrange" onClick={ () => window.open(STATIC_URLS.faqs(locale())) } to={ '#!' }>{t('FAQS')}</Link></LinkText>
                </div>

            </CardBottom>
        </>
    )
}

export default CardFooter;