import { GET_STEP_PROGRESSBAR ,SET_STEP } from 'constants/app'
const initialState = {
}

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_STEP_PROGRESSBAR:
        return { ...state, stepData: action.data };
    case SET_STEP:
        return { ...state, step: action.step }
    default:
        return state;
    }
};