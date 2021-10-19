import { combineReducers } from 'redux';
import articles from './articles'
const appReducer =  combineReducers({
    articles: articles
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        // eslint-disable-next-line no-param-reassign
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer