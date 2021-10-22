/* eslint-disable camelcase */
const querystring = require('querystring')
import { setLocalData } from 'utils/cache'
import axiosInstance from 'services/api';
import {
    loginRequest,
    loginSuccess,
    loginFailed
} from 'actions/login';
import { getUserDetails } from './user';

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
            dispatch(getUserDetails())
            dispatch(loginSuccess(result))
        }else{
            dispatch(loginFailed(result))
        }

    }
}