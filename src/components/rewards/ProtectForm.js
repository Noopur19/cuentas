import React from 'react';
import history from 'utils/history'
import { getParseHtmlArticle } from 'utils/helpers'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import { Card } from '../shared/Footer.styled'
import CardFooter from '../shared/CardFooter'
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
                    <div className="card-link text-center">
                        <p className="description">{ getParseHtmlArticle('wu_131') }</p>
                        <CardFooter></CardFooter>
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