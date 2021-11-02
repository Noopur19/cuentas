import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router  } from 'react-router-dom';
import browserHistory from 'utils/history';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore from './store';
import mainTheme from 'theme/mainTheme'
import { ThemeProvider } from 'styled-components';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'translations/i18n';
import { setLocale } from 'utils/helpers'

const store = configureStore();
setLocale('es')
ReactDOM.render(
    <ThemeProvider theme={ mainTheme } >
        <Provider store={ store }>
            <Router history={ browserHistory }>
                <Suspense fallback={ '' }>
                    <App />
                </Suspense>
            </Router>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
