import { ActionTypes } from 'actions/receiver/actionTypes'
const initialState = {
    loading: false,
    isValid: false,
    receivers: [],
    countries: [],
    statesLoading: false,
    transferDetails: {},
    states: [],
    cities: []
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_WU_NUMBER_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_WU_NUMBER_SUCCESS:
        return { ...state,loading: false, isValid: true,
            receivers: action.payload.receiver ,
            data: action.payload
        };
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
    case ActionTypes.POST_TRANSACTION_DETAILS_REQUEST:
        return { ...state, loading: true }
    case ActionTypes.POST_TRANSACTION_DETAILS:
        return { ...state, loading: false, transferDetails: action.payload }
    case ActionTypes.POST_TRANSACTION_DETAILS_FAILED:
        return { ...state, loading: false }
    case ActionTypes.POST_DELIVERY_DATA_REQUEST:
        return { ...state, loading: true }
    case ActionTypes.POST_DELIVERY_DATA:
        return { ...state, loading: false, postDeliveryData: action.payload  }
    case ActionTypes.POST_DELIVERY_DATA_FAILED:
        return { ...state, loading: false }
    default:
        return state;
    }
};