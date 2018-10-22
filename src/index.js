import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import history from './history';

import './styles/reset.css';
import './styles/fonts.css';
import './index.css';

import App from './App';

import store from './store';

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter history={history}>
            <App />
        </BrowserRouter>
    </Provider>)
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

