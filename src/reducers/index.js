import { combineReducers } from 'redux';
import articles from './articles';
import receiver from './receiver';
import login from './login';
import user from './user';
import theme from './theme'
import transactionHistory from './transactionDetails/transactionHistory';
import { reducer as formReducer } from 'redux-form'

const appReducer = combineReducers({
    articles: articles,
    receiver: receiver,
    form: formReducer,
    theme: theme,
    login: login,
    user: user,
    transactionHistory: transactionHistory
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        // eslint-disable-next-line no-param-reassign
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer