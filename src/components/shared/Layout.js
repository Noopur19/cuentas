import React,{ useEffect } from 'react'
import PropTypes from 'prop-types';
import Navbar from './Navbar'
import { getAllArticles } from 'middleware/articles';
import { login } from 'middleware/login';
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from 'utils/helpers'
import _ from 'lodash'
export const Layout = (props) => {
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.articles.articles)

    useEffect(async() => {
        !getToken() && await dispatch(login('cuentasalert22@mailinator.com','Test@1234'))
        _.isEmpty(articles) && dispatch(getAllArticles())
    }, [])

    return(<>
        <Navbar />
        {props.children }
    </>)
}
Layout.propTypes = {
    children: PropTypes.children
}