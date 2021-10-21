import axiosInstance from 'services/api';
import {
    getWUNumberRequest,
    getWUNumberSuccess,
    getWUNumberFailed
} from 'actions/wuNumber';

export const postWUNumber = (wuNumber) => {
    return (dispatch) => {
        dispatch(getWUNumberRequest(wuNumber))
        axiosInstance.get(`incomm/wu/myWU?number=${ wuNumber }`).then((response) => {
            dispatch(getWUNumberSuccess(response.data))
        }).catch((error) => {
            dispatch(getWUNumberFailed(error))
        })
    }
}