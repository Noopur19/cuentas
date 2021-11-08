import axiosInstance from 'services/api';
import {
    getUserRequest,
    getUserSuccess,
    getUserFailed,
    getIncomeDetailsRequest,
    getIncomeDetailsSuccess,
    getIncomeDetailsFailed,
    getStoreRequest,
    getStoreSuccess,
    getStoreFailed
} from 'actions/user';
import _ from 'lodash'
import { setLocalDataJSON } from 'utils/cache'
import { INCOMM_HEADERS } from 'constants/app'

export const getUserDetails = () => {
    return async (dispatch) => {
        dispatch(getUserRequest())
        const result  = await axiosInstance.get('/users/me')
        if( result.status === 200){
            setLocalDataJSON('user',result.data)
            dispatch(getUserSuccess(result.data))
        }else{
            dispatch(getUserFailed({}))
        }
    }
}

export const getIncomeDetails = (incomeId) => {
    return (dispatch) => {
        dispatch(getIncomeDetailsRequest())
        axiosInstance.get(`/incomm/customers/${ incomeId }/account`,
            {
                headers: _.merge(INCOMM_HEADERS,{ 'x-knetikcloud-channel' : 'MOB' })
            }
        ).then((response) => {
            dispatch(getIncomeDetailsSuccess(response.data))
        }).catch((error) => {
            dispatch(getIncomeDetailsFailed(error))
        })
    }
}

export const getStoreDetails = () => {
    return (dispatch) => {
        dispatch(getStoreRequest())
        axiosInstance.post('/store/search',
            {
                tags:[ 'retail' ]
            },
            {
                headers: _.merge(INCOMM_HEADERS,{ 'x-knetikcloud-channel' : 'app' })
            }
        ).then((response) => {
            dispatch(getStoreSuccess(response.data))
        }).catch((error) => {
            dispatch(getStoreFailed(error))
        })
    }
}