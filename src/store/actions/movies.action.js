import HttpClient from '../../services/movies.httpClient';

export const fetchMoviesList = (filter, page) => dispatch => {
    return HttpClient.getMoviesList(filter, page)
        .then(res => dispatch({type: 'ADD_MOVIES_LIST', payload: res}));
};

export const clearMoviesList = () => dispatch => {
    dispatch({type: 'CLEAR_MOVIES_LIST'});
};

export const fetchMoviesListByGenreId = (id, page) => dispatch => {
    return HttpClient.getMoviesByGenre(id, page)
        .then(res => dispatch({type: 'ADD_MOVIES_LIST', payload: res}));
};

export const fetchMoviesByKey = (key, page) => dispatch => {
    return HttpClient.findMovies(key, page)
        .then(res => dispatch({type: 'ADD_MOVIES_LIST', payload: res}));
};

export const fetchMoviesByKeyShortlist = (key) => dispatch => {
    return HttpClient.findMovies(key, 1);
};

export const fetchMoviesCollection = (collection_id) => dispatch => {
    return HttpClient.getCollection(collection_id)
        .then((res) => dispatch({type: 'ADD_COLLECTION', payload: res}));
};
