import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import moviesList from './movies.reducer.js';
import genresList from './genres.reducer';
import common from './common.reducer';

export default combineReducers({
    routing: routerReducer,
    moviesList,
    genresList,
    common
});