import { ActionTypes } from 'actions/articles/actionTypes'
const initialState = {
    loading: false,
    isLogged: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.LOGIN_SUCCESS:
        return { ...state,loading: false , isLogged: true };
    case ActionTypes.LOGIN_FAILED:
        return { ...state, loading: false };
    default:
        return state;
    }
};