import axiosInstance from 'services/api';
import {
    getUserRequest,
    getUserSuccess,
    getUserFailed,
    getIncomeDetailsRequest,
    getIncomeDetailsSuccess,
    getIncomeDetailsFailed

} from 'actions/user';
import { setLocalDataJSON } from 'utils/cache'
import { INCOMM_HEADERS } from 'constants/app'

export const getUserDetails = () => {
    return (dispatch) => {
        dispatch(getUserRequest())
        axiosInstance.get('/users/me').then((response) => {
            setLocalDataJSON('user',response.data)
            dispatch(getUserSuccess(response.data))
        }).catch((error) => {
            dispatch(getUserFailed(error))
        })
    }
}

export const getIncomeDetails = (incomeId) => {
    return (dispatch) => {
        dispatch(getIncomeDetailsRequest())
        axiosInstance.get(`/incomm/customers/${ incomeId }/account`,
            {
                headers: INCOMM_HEADERS
            }
        ).then((response) => {
            dispatch(getIncomeDetailsSuccess(response.data))
        }).catch((error) => {
            dispatch(getIncomeDetailsFailed(error))
        })
    }
}