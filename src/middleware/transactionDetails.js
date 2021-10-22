import axiosInstance from 'services/api';
import {
    getTransactionHistoryRequest,
    getTransactionHistorySuccess,
    getTransactionHistoryFailed
} from 'actions/transaction-details';
import { getUser } from 'utils/helpers'

export const getTransactionHistory = () => {
    const user = getUser()
    return (dispatch) => {
        dispatch(getTransactionHistoryRequest())
        axiosInstance.get(`invoices?filterUser=${ user.id }&filterSku=western_union`)
            .then((response) => {
                dispatch(getTransactionHistorySuccess(response.data))
            }).catch((error) => {
                dispatch(getTransactionHistoryFailed(error))
            })
    }
}