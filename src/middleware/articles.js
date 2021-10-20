import axiosInstance from 'services/api';
import {
    getArticlesRequest,
    getArticlesSuccess,
    getArticlesFailed
} from 'actions/articles';

export const getAllArticles = () => {
    return (dispatch) => {
        dispatch(getArticlesRequest())
        axiosInstance.post('/articles/search',{
            'tags' : [ 'western_union' ]
        }).then((response) => {
            dispatch(getArticlesSuccess(response.data))
        }).catch((error) => {
            dispatch(getArticlesFailed(error))
        })
    }
}