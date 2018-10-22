import HttpClient from './../../services/httpClient';

export const fetchGenresList = () => dispatch => {
    HttpClient.getGenresList()
        .then(res => dispatch({type: 'ADD_GENRES_LIST', payload: res.genres}));
};