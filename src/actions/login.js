import { ActionTypes } from './articles/actionTypes';

export const loginRequest = () => {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}
export const loginSuccess = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: response
    }
}
export const loginFailed = () => {
    return {
        type: ActionTypes.LOGIN_FAILED,
    }
}