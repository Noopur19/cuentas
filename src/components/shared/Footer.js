import * as React from 'react';
import StyledContainer from './Container.styled'
import Card from './Footer.styled'
import LinkText from './LinkText.styled'
import Link from './Link.styled'
import footerLogo from '../../images/FooterHeading.svg'

const Footer = () => {
    return (
        <>
            <Card>
                <StyledContainer>
                    <img className="mb-4" src={ footerLogo } alt="back"/>
                    <LinkText>Western Union <Link className="link" bold color="orange" href="#!">Privacy Statement</Link></LinkText>
                    <LinkText>Western Union <Link className="link" bold color="orange" href="#!">Terms and Condition</Link></LinkText>
                    <LinkText>Western Union <Link className="link" bold color="orange" href="#!">FAQs</Link></LinkText>
                </StyledContainer>
            </Card>
        </>
    )
}

export default Footer;