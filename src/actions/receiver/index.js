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