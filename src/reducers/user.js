import { ActionTypes } from 'actions/user/actionTypes'
const initialState = {
    loading: false,
    storeLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_USER_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_USER_SUCCESS:
        return { ...state,loading: false };
    case ActionTypes.GET_USER_FAILED:
        return { ...state, loading: false };
    case ActionTypes.GET_INCOME_DETAILS_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_INCOME_DETAILS_SUCCESS:
        return { ...state, loading: false,incomeDetail: action.payload, accountDetail: action.payload.accountDetail };
    case ActionTypes.GET_INCOME_DETAILS_FAILED:
        return { ...state, loading: false };
    case ActionTypes.GET_STORE_REQUEST:
        return { ...state, storeLoading: true };
    case ActionTypes.GET_STORE_SUCCESS:
        return { ...state, storeLoading: false, storeDetail: action.payload };
    case ActionTypes.GET_STORE_FAILED:
        return { ...state, storeLoading: false };
    default:
        return state;
    }
};