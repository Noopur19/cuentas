import React,{ useEffect } from 'react'
import PropTypes from 'prop-types';
import Footer from './Footer'
import Navbar from './Navbar'
import { getAllArticles } from 'middleware/articles';
import { login } from 'middleware/login';
import { useDispatch } from 'react-redux'
import { getToken } from 'utils/helpers'
export const Layout = (props) => {
    const dispatch = useDispatch()
    useEffect(async() => {
        !getToken() && await dispatch(login('bg-1129@mailinator.com','123456789'))
        dispatch(getAllArticles())
    }, [])

    return(<>
        <Navbar />
        {props.children }
        <Footer />
    </>)
}
Layout.propTypes = {
    children: PropTypes.children
}