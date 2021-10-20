import { ActionTypes } from './articles/actionTypes';

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