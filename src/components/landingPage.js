/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getUser , getAccessTokenBytes } from 'utils/helpers'
import { login } from 'middleware/login';
import { getIncomeDetails } from 'middleware/user'
import { useDispatch, useSelector } from 'react-redux'
import history from 'utils/history'
import { getAllArticles } from 'middleware/articles';
import queryString from 'query-string';
import { setLocalData } from 'utils/cache'
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
import { geolocated } from 'react-geolocated';
const publicIp = require('public-ip');
import PropTypes from 'prop-types';

var CryptoJS = require('crypto-js');

const LandingPage = (props) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.articles.articles)
    setLocalData('latlong',`${ props?.coords?.latitude || '37.79' }-${ props?.coords?.longitude || '122.41' }`)
    useEffect(async()=>{
        const propsData = props
        const ip = await publicIp.v4()
        setLocalData('ip',ip)
        const  params = queryString.parse(propsData.location.search)
        const { access_token , incomm_headers, url } = params
        incomm_headers && await setLocalData('incomm_headers',incomm_headers)
        const replaceAccessToken = access_token?.replace(/ /g,'+') || ''
        var bytes  = CryptoJS.AES.decrypt(replaceAccessToken, process.env.REACT_APP_SECRET_KEY);
        var accessToken = getAccessTokenBytes(bytes)
        await dispatch(login(accessToken,t))
        _.isEmpty(articles) && dispatch(getAllArticles())
        const incomeId = getUser()?.additional_properties?.incomm_customer_id?.value
        dispatch(getIncomeDetails(incomeId))
        url ? history.push(url) : history.push('/')
    },[])

    return(<></>)
}
LandingPage.propTypes = {
    incomm_headers: PropTypes.string,
    coords: PropTypes.object,
    preferred_language: PropTypes.string,
    access_token: PropTypes.string
};

export default withRouter(geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(LandingPage))