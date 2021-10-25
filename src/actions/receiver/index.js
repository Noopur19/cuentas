import { ActionTypes } from './actionTypes';

export const getWUNumberRequest = (wuNumber) => {
    return {
        type: ActionTypes.GET_WU_NUMBER_REQUEST,
        payload: wuNumber
    }
}
export const getWUNumberSuccess = (response) => {
    return {
        type: ActionTypes.GET_WU_NUMBER_SUCCESS,
        payload: response
    }
}
export const getWUNumberFailed = () => {
    return {
        type: ActionTypes.GET_WU_NUMBER_FAILED,
    }
}
export const getAllCountriesRequest = () => {
    return {
        type: ActionTypes.GET_COUNTRIES_REQUEST,
    }
}
export const getAllCountriesSuccess = (response) => {
    return {
        type: ActionTypes.GET_COUNTRIES_SUCCESS,
        payload: response
    }
}
export const getAllCountriesFailed = () => {
    return {
        type: ActionTypes.GET_COUNTRIES_FAILED,
    }
}
export const getAllStatesRequest = (country) => {
    return {
        type: ActionTypes.GET_STATES_REQUEST,
        payload:country
    }
}
export const getAllStatesSuccess = (response) => {
    return {
        type: ActionTypes.GET_STATES_SUCCESS,
        payload: response
    }
}
export const getAllStatesFailed = () => {
    return {
        type: ActionTypes.GET_STATES_FAILED,
    }
}

export const postTransactionDetailsRequest = (country) => {
    return {
        type: ActionTypes.POST_TRANSACTION_DETAILS_REQUST,
        payload:country
    }
}
export const postTransactionDetailsSuccess = (response) => {
    return {
        type: ActionTypes.POST_TRANSACTION_DETAILS,
        payload: response
    }
}
export const postTransactionDetailsFailed = () => {
    return {
        type: ActionTypes.POST_TRANSACTION_DETAILS_FAILED,
    }
}
