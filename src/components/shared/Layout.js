import React,{ useEffect } from 'react'
import PropTypes from 'prop-types';
import { ROUTES } from 'constants/AppRoutes'
import Navbar from './Navbar'
import MainLoader from './Loader'
// import { getAllArticles } from 'middleware/articles';
// import { useDispatch, useSelector } from 'react-redux'
import {  useSelector } from 'react-redux'
import history from 'utils/history'
import StyledContainer from '../shared/Container.styled'
// import _ from 'lodash'
export const Layout = (props) => {
    console.log(history)
    // const dispatch = useDispatch()
    // const articles = useSelector((state) => state.articles.articles)
    const showProgressBar = () => {
        return [ ROUTES.RECEIVER_DETAILS ].includes(history.location.pathname)
    }
    const activeCard = () =>{
        return history?.location?.pathname?.match('transaction-history-details')
    }
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

    return(<StyledContainer className={ `main-layout ${ showProgressBar() && 'active-progress-bar' } ${ activeCard() && 'active-card' }` }>
        <Navbar showProgressBar={ showProgressBar } />
        {loading && <MainLoader />}
        {props.children }
    </StyledContainer>)
}
Layout.propTypes = {
    children: PropTypes.children
}