/* eslint-disable camelcase */
import { setLocalData } from 'utils/cache'
import { notification } from 'services/notification';
import {
    loginRequest,
    loginSuccess,
    loginFailed
} from 'actions/login';
import { getStoreDetails, getUserDetails } from './user';

export const login = (access_token) => {
    return async(dispatch) => {
        dispatch(loginRequest())
        if(access_token){
            setLocalData('accessToken', access_token)
            await dispatch(getUserDetails())
            await dispatch(getStoreDetails())
            dispatch(loginSuccess(access_token))
        }else{
            dispatch(loginFailed(access_token))
            notification('error','Sorry token has been expired')
        }

    }
}