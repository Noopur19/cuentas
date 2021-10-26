import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getToken, getUser } from 'utils/helpers'
import { login } from 'middleware/login';
import { getIncomeDetails } from 'middleware/user'
import { useDispatch, useSelector } from 'react-redux'
import history from 'utils/history'
import { getAllArticles } from 'middleware/articles';
import _ from 'lodash'
const LandingPage = (props) => {
    console.log(props)
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.articles.articles)

    useEffect(async()=>{
        !getToken() && await dispatch(login('cuentasalert22@mailinator.com','Test@1234'))
        _.isEmpty(articles) && dispatch(getAllArticles())
        dispatch(getIncomeDetails(getUser()?.additional_properties?.incomm_customer_id?.value))
        history.push('/')
    },[])

    return(<></>)
}

export default withRouter(LandingPage)