import { GET_STEP_PROGRESSBAR } from 'constants/app'
const initialState = {
}

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_STEP_PROGRESSBAR:
        return { ...state, stepData: action.data };
    default:
        return state;
    }
};