import React from 'react';
import LinkText from '../shared/LinkText.styled'
import Link from '../shared/Link.styled'
// import footerLogo from '../../images/FooterHeading.svg'
import footerLogo from '../../images/wu_icon.png'
import CardBottom from '../shared/CardFooter.styled'
import { useTranslation } from 'react-i18next';
const CardFooter = () => {
    const { t } = useTranslation()
    return (
        <>
            <CardBottom className="CardFooter">

                <p className="description">
                    If you are a Western Union My WU Member you
                    can enter your 9 digit My WU number to earn points on
                    qualifying transactions.
                </p>
                <div className="card-link text-center">
                    <img className="img-fluid my-2" src={ footerLogo } alt="back"/>
                    <LinkText>{t('WU_TEXT')} <Link className="link" bold color="textOrange" href="#!">{t('PRIVACY_STATEMENT')}</Link></LinkText>
                    <LinkText>{t('WU_TEXT')} <Link className="link" bold color="textOrange" href="#!">{t('TERMS_CONDITIONS')}</Link></LinkText>
                    <LinkText>{t('WU_TEXT')} <Link className="link" bold color="textOrange" href="#!">{t('FAQS')}</Link></LinkText>
                </div>

            </CardBottom>
        </>
    )
}

export default CardFooter;