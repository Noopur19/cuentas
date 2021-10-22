import { ActionTypes } from './actionTypes'

export const getTransactionHistoryRequest = () => {
    return { type: ActionTypes.GET_TRANSACTION_HISTORY_REQUEST }
}
export const getTransactionHistorySuccess = (response) => {
    return {
        type: ActionTypes.GET_TRANSACTION_HISTORY_SUCCESS,
        payload: response
    }
}
export const getTransactionHistoryFailed = () => {
    return {
        type: ActionTypes.GET_TRANSACTION_HISTORY_FAILED,
    }
}