/* eslint-disable camelcase */
import { setLocalData } from 'utils/cache'
import { notification } from 'services/notification';
import {
    loginRequest,
    loginSuccess,
    loginFailed
} from 'actions/login';
import { getStoreDetails, getUserDetails } from './user';
import axiosInstance from 'services/api';
const querystring = require('querystring')
export const login = (access_token) => {
    return async(dispatch) => {
        dispatch(loginRequest())
        if(access_token){
            const result = await axiosInstance.post('/oauth/token', querystring.stringify({
                username: 'cuentasalert22@mailinator.com',
                password: 'Test@1234',
                grant_type: 'password',
                client_id: 'knetik'
            }))
            setLocalData('accessToken', result.data.access_token)
            await dispatch(getUserDetails())
            await dispatch(getStoreDetails())
            dispatch(loginSuccess(access_token))
        }else{
            dispatch(loginFailed(access_token))
            notification('error','Sorry token has been expired')
        }

    }
}