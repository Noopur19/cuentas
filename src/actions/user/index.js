import { ActionTypes } from './actionTypes';

export const getUserRequest = () => {
    return {
        type: ActionTypes.GET_USER_REQUEST
    }
}
export const getUserSuccess = (response) => {
    return {
        type: ActionTypes.GET_USER_SUCCESS,
        payload: response
    }
}
export const getUserFailed = () => {
    return {
        type: ActionTypes.GET_USER_FAILED,
    }
}
export const getIncomeDetailsRequest = () => {
    return {
        type: ActionTypes.GET_INCOME_DETAILS_REQUEST
    }
}
export const getIncomeDetailsSuccess = (response) => {
    return {
        type: ActionTypes.GET_INCOME_DETAILS_SUCCESS,
        payload: response
    }
}
export const getIncomeDetailsFailed = () => {
    return {
        type: ActionTypes.GET_INCOME_DETAILS_FAILED,
    }
}
