import axiosInstance from 'services/api';
import {
    getArticlesRequest,
    getArticlesSuccess,
    getArticlesFailed
} from 'actions/articles'
export const getAllArticles = () => {
    return (dispatch) => {
        dispatch(getArticlesRequest())
        axiosInstance.get('/app/links').then((response) => {
            dispatch(getArticlesSuccess(response.data))
        }).catch(() => {
            dispatch(getArticlesFailed())
        })
    }
}