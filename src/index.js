import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { syncHistoryWithStore } from 'react-router-redux';

import history from './history';

import './styles/reset.css';
import './styles/fonts.css';
import './styles/index.css';

import App from './App';

import store from './store';

// const myHistory = syncHistoryWithStore(history, store); // react-redux-router 

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>)
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

