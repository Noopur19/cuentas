import React,{ useEffect } from 'react'
import PropTypes from 'prop-types';
import Navbar from './Navbar'
import MainLoader from './Loader'
// import { getAllArticles } from 'middleware/articles';
// import { useDispatch, useSelector } from 'react-redux'
import {  useSelector } from 'react-redux'

// import _ from 'lodash'
export const Layout = (props) => {
    // const dispatch = useDispatch()
    // const articles = useSelector((state) => state.articles.articles)
    const loading = useSelector((state) =>
        state.articles.loading ||
        state.login.loading ||
        state.receiver.loading ||
        state.user.loading ||
        state.transactionHistory.loading ||
        state.transactionHistory.enquiryLoading
    )

    useEffect(async() => {
        // _.isEmpty(articles) && dispatch(getAllArticles())
    }, [])

    return(<>
        <Navbar />
        {loading && <MainLoader />}
        {props.children }
    </>)
}
Layout.propTypes = {
    children: PropTypes.children
}