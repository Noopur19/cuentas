/* eslint-disable camelcase */
import { setLocalData } from 'utils/cache'
import { notification } from 'services/notification';
import {
    loginRequest,
    loginSuccess,
    loginFailed
} from 'actions/login';
import { getStoreDetails, getUserDetails } from './user';
import history from 'utils/history'
import axiosInstance from 'services/api';
const querystring = require('querystring')

export const login = (access_token, t) => {
    return async(dispatch) => {
        dispatch(loginRequest())
        if(access_token){
            const result = await axiosInstance.post('/oauth/token', querystring.stringify({
                username: 'tk2041@mailinator.com',
                password: 'Secure@123',
                grant_type: 'password',
                client_id: 'knetik'
            }))
            setLocalData('accessToken', result.data.access_token)
            //setLocalData('accessToken', access_token)
            await dispatch(getUserDetails(t))
            await dispatch(getStoreDetails())
            dispatch(loginSuccess(access_token))
        }else{
            history.push('/error')
            dispatch(loginFailed(access_token))
            notification('error',t('SESSION_TIMEOUT'))
        }

    }
}