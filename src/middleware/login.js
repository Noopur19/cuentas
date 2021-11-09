/* eslint-disable camelcase */
const querystring = require('querystring')
import { setLocalData } from 'utils/cache'
import { notification } from 'services/notification';
import axiosInstance from 'services/api';
import {
    loginRequest,
    loginSuccess,
    loginFailed
} from 'actions/login';
import { getStoreDetails, getUserDetails } from './user';

export const login = (username, password) => {
    return async(dispatch) => {
        dispatch(loginRequest())
        const result = await axiosInstance.post('/oauth/token', querystring.stringify({
            username,
            password,
            grant_type: 'password',
            client_id: 'knetik'
        }))
        if(result.status === 200){
            setLocalData('accessToken', result.data.access_token)
            await dispatch(getUserDetails())
            await dispatch(getStoreDetails())
            dispatch(loginSuccess(result))
        }else{
            dispatch(loginFailed(result))
            notification('error','Sorry token has been expired')
        }

    }
}