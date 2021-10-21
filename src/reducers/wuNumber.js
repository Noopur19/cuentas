import { ActionTypes } from 'actions/articles/actionTypes'
const initialState = {
    loading: false,
    isValid: false,
    receivers: []
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_WU_NUMBER_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_WU_NUMBER_SUCCESS:
        return { ...state,loading: false, isValid: true, receivers: action.payload.receiver };
    case ActionTypes.GET_WU_NUMBER_FAILED:
        return { ...state, loading: false, isValid: false };
    default:
        return state;
    }
};