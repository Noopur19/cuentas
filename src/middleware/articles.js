import axiosInstance from 'services/api';
import {
    getArticlesRequest,
    getArticlesSuccess,
    getArticlesFailed
} from 'actions/articles';
import { setLocalDataJSON } from 'utils/cache'
export const getAllArticles = () => {
    return (dispatch) => {
        dispatch(getArticlesRequest())
        axiosInstance.post('/articles/search',{
            'tags': [
                'western_union'
            ],
            'size' : 100
        }, { headers: { 'Content-Type' : 'application/json' }
        }).then((response) => {
            setLocalDataJSON('articles',response.data.result)
            dispatch(getArticlesSuccess(response.data))
        }).catch((error) => {
            dispatch(getArticlesFailed(error))
        })
    }
}