import { ActionTypes } from 'actions/transaction-details/actionTypes'
const initialState = {
    loading: false,
    invoices: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_TRANSACTION_HISTORY_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_TRANSACTION_HISTORY_SUCCESS:
        return { ...state,loading: false , invoices: action.payload };
    case ActionTypes.GET_TRANSACTION_HISTORY_FAILED:
        return { ...state, loading: false };
    default:
        return state;
    }
};