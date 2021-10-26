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

export const getTransactionStatus = (status) => {
    switch (status) {
    case 'AVAILABLE':
        return 'Cancel'
    case 'CANCELLED':
        return 'Cancelled';
    case 'PAID':
        return 'Refunded';
    default:
        return '';
    }
}

export const getCountryName = (countries, code) => {
    const country = countries.filter((item) => item.currency[ 0 ].country_cd === code)
    return country && country[ 0 ].country
}