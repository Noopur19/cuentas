import axiosInstance from 'services/api';
import {
    getUserRequest,
    getUserSuccess,
    getUserFailed
} from 'actions/user';
import { setLocalDataJSON } from 'utils/cache'

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