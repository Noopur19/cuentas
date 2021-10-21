import { ActionTypes } from 'actions/receiver/actionTypes'
const initialState = {
    loading: false,
    isValid: false,
    receivers: [],
    countries: [],
    states: [],
    cities: []
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_WU_NUMBER_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_WU_NUMBER_SUCCESS:
        return { ...state,loading: false, isValid: true, receivers: action.payload.receiver };
    case ActionTypes.GET_WU_NUMBER_FAILED:
        return { ...state, loading: false, isValid: false };
    case ActionTypes.GET_COUNTRIES_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_COUNTRIES_SUCCESS:
        return { ...state,loading: false, countries: action.payload };
    case ActionTypes.GET_COUNTRIES_FAILED:
        return { ...state, loading: false, isValid: false };
    case ActionTypes.GET_STATES_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_STATES_SUCCESS:
        return { ...state,loading: false, states: action.payload };
    case ActionTypes.GET_STATES_FAILED:
        return { ...state, loading: false, isValid: false };
    default:
        return state;
    }
};