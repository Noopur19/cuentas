import axiosInstance from 'services/api';
import {
    getWUNumberRequest,
    getWUNumberSuccess,
    getWUNumberFailed,
    getAllCountriesRequest,
    getAllCountriesSuccess,
    getAllCountriesFailed,
    getAllStatesRequest,
    getAllStatesSuccess,
    getAllStatesFailed,

    postTransactionDetailsRequest,
    postTransactionDetailsSuccess,
    postTransactionDetailsFailed,

    postDeliveryDataRequest,
    postDeliveryDataSuccess,
    postDeliveryDataFailed
} from 'actions/receiver';
import history from 'utils/history'
import { ROUTES } from 'constants/AppRoutes'
import { deliveryTypeRequestPayload } from 'utils/helpers'
import { notification } from 'services/notification';

export const postWUNumber = (wuNumber) => {
    return (dispatch) => {
        dispatch(getWUNumberRequest(wuNumber))
        axiosInstance.get(`incomm/wu/myWU?number=${ wuNumber }`).then((response) => {
            history.push(ROUTES.PROTECT_FORM)
            dispatch(getWUNumberSuccess(response.data))
        }).catch((error) => {
            const errorData = error?.response?.data?.result && error.response.data.result[ 0 ].cause.root.Envelope.Body.Fault.detail[ 'error-reply' ].error
            notification('error',errorData)
            dispatch(getWUNumberFailed(error))
        })
    }
}
export const callMyNUNumber = (wuNumber) => {
    return (dispatch) => {
        dispatch(getWUNumberRequest(wuNumber))
        axiosInstance.get(`incomm/wu/myWU?number=${ wuNumber }`).then((response) => {
            dispatch(getWUNumberSuccess(response.data))
        }).catch((error) => {
            const errorData = error?.response?.data?.result && error.response.data.result[ 0 ].cause.root.Envelope.Body.Fault.detail[ 'error-reply' ].error
            notification('error',errorData)
            dispatch(getWUNumberFailed(error))
        })
    }
}

export const getAllCountries = ( ) => {
    return (dispatch) => {
        dispatch(getAllCountriesRequest())
        axiosInstance.get('/incomm/wu/countrycurrency').then((response) => {
            dispatch(getAllCountriesSuccess(response.data))
        }).catch((error) => {
            dispatch(getAllCountriesFailed(error))
        })
    }
}

export const getAllStates = (country) => {
    return (dispatch) => {
        dispatch(getAllStatesRequest())
        axiosInstance.get(`/incomm/wu/statecity?country=${ country }`).then((response) => {
            dispatch(getAllStatesSuccess(response.data))
        }).catch((error) => {
            dispatch(getAllStatesFailed(error))
        })
    }
}

export const postTransactionDetails = (data,callback) => {
    return(dispatch) => {
        dispatch(postTransactionDetailsRequest())
        axiosInstance.post('incomm/wu/feeinquiry',data,{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            dispatch(postTransactionDetailsSuccess(response.data))
            callback && callback(data)
        }).catch((error) => {
            dispatch(postTransactionDetailsFailed(error))
        })
    }
}

export const postDeliveryData = (values, incomeDetail,callback) => {
    const data = deliveryTypeRequestPayload(values,incomeDetail)
    return(dispatch) => {
        dispatch(postDeliveryDataRequest())
        axiosInstance.post('incomm/wu/smv',data,{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            dispatch(postDeliveryDataSuccess(response.data))
            callback && callback(values)
        }).catch((error) => {
            dispatch(postDeliveryDataFailed(error))
        })
    }
}