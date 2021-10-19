import { ActionTypes } from 'actions/articles/actionTypes'
const initialState = {
    loading: false,
    articles: []
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_ALL_ARTICLES_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_ALL_ARTICLES:
        return { ...state,loading: false };
    case ActionTypes.GET_ALL_ARTICLES_FAILED:
        return { ...state, loading: false };
    default:
        return state;
    }
};