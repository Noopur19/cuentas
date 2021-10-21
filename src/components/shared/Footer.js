import * as React from 'react';
import StyledContainer from './Container.styled'
import { FooterCard, FooterButton } from './Footer.styled'
import LinkText from './LinkText.styled'
import Link from './Link.styled'
import footerLogo from '../../images/FooterHeading.svg'
import PropTypes from 'prop-types'
const Footer = (props) => {
    return (
        <>
            <FooterCard>
                <StyledContainer>
                    <img className="mb-4" src={ footerLogo } alt="back"/>
                    <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">Privacy Statement</Link></LinkText>
                    <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">Terms and Condition</Link></LinkText>
                    <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">FAQs</Link></LinkText>
                </StyledContainer>
            </FooterCard>
            <FooterButton className='footer-button'>{props.children}</FooterButton>
        </>
    )
}

Footer.propTypes = {
    children: PropTypes.children
}

export default Footer;