import { ActionTypes } from 'actions/receiver/actionTypes'
const initialState = {
    loading: false,
    isValid: false,
    receivers: [],
    countries: [],
    statesLoading: false,
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
        return { ...state, loading: true, statesLoading:  true };
    case ActionTypes.GET_STATES_SUCCESS:
        return { ...state,loading: false, statesLoading: false,states: action.payload };
    case ActionTypes.GET_STATES_FAILED:
        return { ...state, loading: false,statesLoading:false, isValid: false };
    default:
        return state;
    }
};