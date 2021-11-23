import { GET_STEP_PROGRESSBAR ,SET_STEP, MAT_PAT_FORMAT,MID_LAST_FORMAT,SELECT_NAME_FORMAT } from 'constants/app'
const initialState = {
    isMatPatFormat: false,
    isMidLastFormat: true,
    format: { value: 'First/Last Name Format', label: 'First/Last Name Format' }
}

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_STEP_PROGRESSBAR:
        return { ...state, stepData: action.data };
    case SET_STEP:
        return { ...state, step: action.step };
    case MAT_PAT_FORMAT:
        return { ...state, isMatPatFormat: action.set , isMidLastFormat: !action.set };
    case MID_LAST_FORMAT:
        return { ...state, isMatPatFormat: !action.set, isMidLastFormat: action.set,  }
    case SELECT_NAME_FORMAT:
        return { ...state, format: action.data }
    default:
        return state;
    }
};