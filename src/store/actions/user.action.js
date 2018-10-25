import HttpClient from './../../services/user.httpClient';

export const autorizeUser = (username, password) => dispatch => {
    dispatch({type: 'SET_REQUEST_STATUS_TRUE'});

    HttpClient.getRequestToken()
        .then(res => res.request_token)
        .then((token) => HttpClient.createLoginSession({
            username,
            password,
            request_token: token
        }))
        .then((res) => HttpClient.createSession({request_token: res.request_token}))
        .then((res) => {
            const { session_id } = res;

            dispatch({type: 'UPDATE_SESSION_ID', payload: session_id});
            dispatch({type: 'SET_REQUEST_STATUS_FALSE'});
            
            return session_id;
        })
        .then((session_id) => HttpClient.getAccountDetails(session_id))
        .then((user) => dispatch({type: 'SET_USER_LOG_IN', payload: user}))
        .finally(() => dispatch({type: 'SET_REQUEST_STATUS_FALSE'}));
};

export const logOutUser = (session_id) => dispatch => {
    HttpClient.closeSession(session_id)
        .then(() => dispatch({type: 'SET_USER_LOG_OUT'}));
};

export const markAsFavorite = (params) => dispatch => {
    const { media_id } = params;

    HttpClient.markAsFavorite(params)
        .then(() => dispatch({type: 'ADD_TO_FAVORITE_LIST', payload: media_id}));
};
