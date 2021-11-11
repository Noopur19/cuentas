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
import { getIncommHeaders } from 'utils/helpers'

import { setLocale } from 'utils/helpers'
export const getUserDetails = () => {
    return async (dispatch) => {
        dispatch(getUserRequest())
        const result  = await axiosInstance.get('/users/me')
        if( result.status === 200){
            setLocale(result?.data?.additional_properties?.preferred_language?.value || 'en')

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
                headers: _.merge(getIncommHeaders(),{ 'x-knetikcloud-channel' : 'MOB' })
            }
        ).then((response) => {
            dispatch(getIncomeDetailsSuccess(response.data))
        }).catch((error) => {
            dispatch(getIncomeDetailsFailed(error))
            // TO DO show error notification
        })
    }
}

export const getStoreDetails = () => {
    return (dispatch) => {
        dispatch(getStoreRequest())
        axiosInstance.post('/store/search',
            {
                tags:[ 'western_union' ]
            },
            {
                headers: _.merge(getIncommHeaders(),{ 'x-knetikcloud-channel' : 'both' })
            }
        ).then((response) => {
            dispatch(getStoreSuccess(response.data))
        }).catch((error) => {
            dispatch(getStoreFailed(error))
            // TO DO show error notification
        })
    }
}