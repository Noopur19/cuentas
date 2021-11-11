import React,{ useEffect } from 'react'
import PropTypes from 'prop-types';
import { ROUTES } from 'constants/AppRoutes'
import Navbar from './Navbar'
import MainLoader from './Loader'
import {  useSelector } from 'react-redux'
import history from 'utils/history'
import StyledContainer from '../shared/Container.styled'

export const Layout = (props) => {

    const showProgressBar = () => {
        return [ ROUTES.RECEIVER_DETAILS ].includes(history.location.pathname)
    }
    const activeCard = () =>{
        return history?.location?.pathname?.match('transaction-history-details')
    }

    const successCard = () =>{
        return history?.location?.pathname?.match('success')
    }

    const stepData =  useSelector((state) => state.theme.stepData)
    const getConfirmClassName = (value) => {
        return stepData?.step == value && 'confirm'
    }

    const loading = useSelector((state) =>
        state.articles.loading ||
        state.login.loading ||
        state.receiver.loading ||
        state.user.loading ||
        state.transactionHistory.loading ||
        state.transactionHistory.enquiryLoading ||
        state.transactionHistory.confirmLoading ||
        state.transactionHistory.cancelLoading
    )

    useEffect(async() => {
        // _.isEmpty(articles) && dispatch(getAllArticles())
    }, [])

    return(<StyledContainer
        className={ `main-layout ${ showProgressBar() &&
            'active-progress-bar' } ${ activeCard() &&
            'active-card' } ${ getConfirmClassName(4) } ${
            successCard() && 'success'
        } ` }>
        <Navbar showProgressBar={ showProgressBar } activeCard={ activeCard } />
        {loading && <MainLoader />}
        {props.children }
    </StyledContainer>)
}
Layout.propTypes = {
    children: PropTypes.object
}