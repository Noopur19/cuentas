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
import { deliveryTypeRequestPayload , getErrorInsuff } from 'utils/helpers'
import { notification } from 'services/notification';
import { GET_ERROR_FIELD } from 'constants/app';

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
            response?.error?.error && notification('error',`${ response?.error?.error }`)
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
            response?.error?.error && notification('error',`${ response?.error?.error }`)
        }).catch((error) => {
            dispatch(getAllStatesFailed(error))
        })
    }
}

export const postTransactionDetails = (data,callback, t) => {
    return(dispatch) => {
        dispatch(postTransactionDetailsRequest())
        axiosInstance.post('incomm/wu/feeinquiry',data,{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200 ) {
                dispatch(postTransactionDetailsSuccess(response.data))
                callback && callback(data)
            } else if (response.error && response.error.error) {
                response?.error?.error ?
                    notification('error',response?.error?.error)
                    : notification('error',`${ t('FAILED_TO_CURRENCY_RATE') }`)
            } else {
                notification('error',`${ t('SOMETHING_WENT_WRONG_ERROR') }`)
            }
        }).catch((error) => {
            dispatch(postTransactionDetailsFailed(error))
            notification('error',GET_ERROR_FIELD.ERROR(error))
        })
    }
}

export const postDeliveryData = (values, incomeDetail,callback, t) => {
    const data = deliveryTypeRequestPayload(values,incomeDetail)
    return(dispatch) => {
        dispatch(postDeliveryDataRequest())
        axiosInstance.post('incomm/wu/smv',data,{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200) {
                dispatch(postDeliveryDataSuccess(response.data))
                callback && callback(values)
            } else if (response.error && response.error.error) {
                response?.error?.error ?
                    notification('error',response?.error?.error)
                    : notification('error',`${ t('FAILED_TO_SEND_MONEY_VALUATION') }`)
            } else {
                notification('error',`${ t('SOMETHING_WENT_WRONG_ERROR') }`)
            }
        }).catch((error) => {
            dispatch(postDeliveryDataFailed(error))
            // notification('error',GET_ERROR_FIELD.ERROR(error))
        })
    }
}

export const postTransactionDetailsSubmission = (data,callback, t,availBail,  getTotalAmount) => {
    return(dispatch) => {
        dispatch(postTransactionDetailsRequest())
        axiosInstance.post('incomm/wu/feeinquiry',data,{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200 ) {
                const paymentDetails = response.data?.service_options?.service_option && response.data?.service_options?.service_option[ 0 ]?.payment_details
                const totalAmount = getTotalAmount(paymentDetails)
                if(availBail >= totalAmount ){
                    dispatch(postTransactionDetailsSuccess(response.data))
                    callback && callback(data)
                }else{
                    dispatch(postTransactionDetailsFailed(null))
                    notification('error',getErrorInsuff(totalAmount))
                }
            } else if (response.error && response.error.error) {
                response?.error?.error ?
                    notification('error',response?.error?.error)
                    : notification('error',`${ t('FAILED_TO_CURRENCY_RATE') }`)
            } else {
                notification('error',`${ t('SOMETHING_WENT_WRONG_ERROR') }`)
            }
        }).catch((error) => {
            dispatch(postTransactionDetailsFailed(error))
            notification('error',GET_ERROR_FIELD.ERROR(error))
        })
    }
}
