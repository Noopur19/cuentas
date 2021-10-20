import { ActionTypes } from 'actions/articles/actionTypes'
const initialState = {
    loading: false,
    articles: [],
    totalArticles: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_ALL_ARTICLES_REQUEST:
        return { ...state, loading: true,totalArticles: 0, articles: [] };
    case ActionTypes.GET_ALL_ARTICLES:
        return { ...state,loading: false,totalArticles: action.payload.total, articles: action.payload.result };
    case ActionTypes.GET_ALL_ARTICLES_FAILED:
        return { ...state, loading: false,totalArticles:0, articles: [] };
    default:
        return state;
    }
};