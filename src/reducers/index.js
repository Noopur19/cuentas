import { combineReducers } from 'redux';
import articles from './articles';
import receiver from './receiver';
import login from './login';
import { reducer as formReducer } from 'redux-form'

const appReducer = combineReducers({
    articles: articles,
    receiver: receiver,
    form: formReducer,
    login: login
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        // eslint-disable-next-line no-param-reassign
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer