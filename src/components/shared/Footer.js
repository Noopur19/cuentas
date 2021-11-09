import * as React from 'react';
import { FooterButton } from './Footer.styled'
import PropTypes from 'prop-types'
const Footer = (props) => {
    return (
        <>
            <FooterButton className='footer-button'>{props.children}</FooterButton>
        </>
    )
}

Footer.propTypes = {
    children: PropTypes.object
}

export default Footer;