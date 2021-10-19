import { ActionTypes } from './actionTypes'
export const getArticlesRequest = () => {
    return { type:  ActionTypes.GET_ALL_ARTICLES_REQUEST }
}
export const getArticlesSuccess = (response) => {
    return {
        type: ActionTypes.GET_ALL_ARTICLES,
        payload: response
    }
}
export const getArticlesFailed = () => {
    return {
        type: ActionTypes.GET_ALL_ARTICLES_FAILED,
    }
}