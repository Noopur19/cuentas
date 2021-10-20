import axiosInstance from 'services/api';
import {
    loginRequest,
    loginSuccess,
    loginFailed
} from 'actions/login';

export const login = (username, password) => {
    return (dispatch) => {
        dispatch(loginRequest(username, password))
        axiosInstance.post('/oauth/token', {
            username,
            password,
            grant_type: 'password',
            client_id: 'knetik'
        }).then((response) => {
            dispatch(loginSuccess(response.data))

            // set token in localStorage

        }).catch(() => {
            dispatch(loginFailed())
        })
    }
}