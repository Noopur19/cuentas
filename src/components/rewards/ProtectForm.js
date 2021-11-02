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

const ProtectForm = () => {
    const onClickHandler = () => {
        history.push('/receiver-details')
    }

    return (
        <>
            <div className="ProtectForm">
                <Card>
                    { getParseHtmlArticle('wu_119') }
                    <p className="description">
                        If you are a Western Union My WU Member you
                        can enter your 9 digit My WU number to earn points on
                        qualifying transactions.
                    </p>
                    <div className="card-link">
                        <img className="img-fluid my-2" src={ footerLogo } alt="back"/>
                        <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">Privacy Statement</Link></LinkText>
                        <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">Terms and Condition</Link></LinkText>
                        <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">FAQs</Link></LinkText>
                    </div>
                </Card>
                <Footer>
                    <Button onClick={ () => history.push(ROUTES.ROOT) } >Cancel</Button>
                    <Button outlined onClick={ () => onClickHandler() } type='submit'>Agree</Button>
                </Footer>
            </div>
        </>
    )
}

export default ProtectForm;