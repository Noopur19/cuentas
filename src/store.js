import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers =  compose

const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(
        thunk,
        promise,
    )
)(createStore);

export default function configureStore() {
    const store = createStoreWithMiddleware(rootReducer);
    return store;
}