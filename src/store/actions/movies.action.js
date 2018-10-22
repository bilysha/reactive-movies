import HttpClient from './../../services/httpClient';

export const fetchMoviesList = (filter) => dispatch => {
    HttpClient.getMoviesList(filter)
        .then(res => dispatch({type: 'ADD_MOVIES_LIST', payload: res.results}));
};

export const fetchMoviesListByGenreId = (id) => dispatch => {
    HttpClient.getMoviesByGenre(id)
        .then(res => dispatch({type: 'ADD_MOVIES_LIST', payload: res.results}));
};

export const fetchMoviesByKey = (key) => dispatch => {
    HttpClient.findMovies(key)
        .then(res => dispatch({type: 'ADD_MOVIES_LIST', payload: res.results}));
}
