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
import history from 'utils/history'
import { setLocale } from 'utils/helpers'
import { notification } from 'services/notification';
export const getUserDetails = (t) => {
    return async (dispatch) => {
        dispatch(getUserRequest())
        try{
            const result  = await axiosInstance.get('/users/me')
            if( result.status === 200){
                setLocale(result?.data?.additional_properties?.preferred_language?.value || 'en')

                setLocalDataJSON('user',result.data)
                dispatch(getUserSuccess(result.data))
            }else{
                dispatch(getUserFailed({}))
            }
        }catch(e){
            console.log(e)
            notification('error',t('SESSION_TIMEOUT'))

            history.push('/error')
        }

    }
}

export const getIncomeDetails = (incomeId) => {
    return (dispatch) => {
        dispatch(getIncomeDetailsRequest())
        axiosInstance.get(`/incomm/customers/${ incomeId }/account`,
            {
                headers: _.merge(getIncommHeaders())
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
                headers: _.merge(getIncommHeaders(),{ 'x-knetikcloud-channel' : 'WEB' })
            }
        ).then((response) => {
            dispatch(getStoreSuccess(response.data))
        }).catch((error) => {
            dispatch(getStoreFailed(error))
            // TO DO show error notification
        })
    }
}