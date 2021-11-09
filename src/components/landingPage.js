import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getUser } from 'utils/helpers'
import { login } from 'middleware/login';
import { getIncomeDetails } from 'middleware/user'
import { useDispatch, useSelector } from 'react-redux'
import history from 'utils/history'
import { getAllArticles } from 'middleware/articles';
import _ from 'lodash'
const LandingPage = () => {
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.articles.articles)

    useEffect(async()=>{
        //await dispatch(login('cuentasalert22@mailinator.com','Test@1234'))
        await dispatch(login('tk2041@gmail.com','Secure@123'))
        _.isEmpty(articles) && dispatch(getAllArticles())
        const incomeId = getUser()?.additional_properties?.incomm_customer_id?.value
        dispatch(getIncomeDetails(incomeId))
        history.push('/')
    },[])

    return(<></>)
}

export default withRouter(LandingPage)