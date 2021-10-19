import React from 'react'
import PropTypes from 'prop-types';
import Footer from './Footer'
import Navbar from './Navbar'
export const Layout = (props) => {
    return(<>
        <Navbar />
        {props.children }
        <Footer />
    </>)
}
Layout.propTypes = {
    children: PropTypes.children
}