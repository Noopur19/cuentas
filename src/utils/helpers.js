import { getLocalData } from './cache'
import ReactHtmlParser from 'react-html-parser';

export const getUser = () => {
    return getLocalData('user') && JSON.parse(getLocalData('user'))
}

export const getToken = () => {
    return getLocalData('accessToken')
}

export const getArticles = () => {
    const articles = getLocalData('articles') && JSON.parse(getLocalData('articles'))
    return articles
}

export const getArticle = (id) => {
    const articles = getArticles()
    return articles.filter((article) => article.id === id )[ 0 ]
}

export const getParseHtmlArticle = (id) => {
    const article = getArticle(id)
    return article?.body ? ReactHtmlParser(article?.body) : null
}