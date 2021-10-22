import { ActionTypes } from 'actions/user/actionTypes'
const initialState = {
    loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_USER_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_USER_SUCCESS:
        return { ...state,loading: false };
    case ActionTypes.GET_USER_FAILED:
        return { ...state, loading: false };
    default:
        return state;
    }
};