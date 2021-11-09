import React from 'react';
import history from 'utils/history'
import { getParseHtmlArticle } from 'utils/helpers'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import { Card } from '../shared/Footer.styled'
import LinkText from '../shared/LinkText.styled'
import Link from '../shared/Link.styled'
import footerLogo from '../../images/FooterHeading.svg'
import { ROUTES } from 'constants/AppRoutes'
import { useTranslation } from 'react-i18next';

const ProtectForm = () => {

    const { t } = useTranslation();
    const onClickHandler = () => {
        history.push('/receiver-details')
    }

    return (
        <>
            <div className="ProtectForm">
                <Card>
                    { getParseHtmlArticle('wu_119') }
                    <div className="card-link">
                        <img className="img-fluid my-2" src={ footerLogo } alt="back"/>
                        <LinkText>{t('WESTERN_UNION')}<Link className="link" bold color="textOrange" href="#!">{t('PRIVACY_STATEMENT')}</Link></LinkText>
                        <LinkText>{t('WESTERN_UNION')}<Link className="link" bold color="textOrange" href="#!">{t('TERMS_CONDITIONS')}</Link></LinkText>
                        <LinkText>{t('WESTERN_UNION')}<Link className="link" bold color="textOrange" href="#!">{t('FAQS')}</Link></LinkText>
                    </div>
                </Card>
                <Footer>
                    <Button onClick={ () => history.push(ROUTES.ROOT) } >{t('CANCEL_TEXT')}</Button>
                    <Button outlined onClick={ () => onClickHandler() } type='submit'>{t('AGREE_TEXT')}</Button>
                </Footer>
            </div>
        </>
    )
}

export default ProtectForm;