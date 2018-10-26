const initialState = {
    sessionId: null,
    requestInProgress: false,
    user: null,
    loggedIn: false,
    favoriteList: [],
    watchList: []
};

export default function account(state = initialState, action) {
    switch(action.type) {
        case 'UPDATE_SESSION_ID':
            return {
                ...state,
                sessionId: action.payload
            };
        case 'SET_REQUEST_STATUS_TRUE':
            return {
                ...state,
                requestInProgress: true
            };
        case 'SET_REQUEST_STATUS_FALSE':
            return {
                ...state,
                requestInProgress: false
            };
        case 'SET_USER_LOG_IN':
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case 'SET_USER_LOG_OUT':
            return initialState;
        case 'ADD_TO_FAVORITE_LIST':
            state.favoriteList.push(action.payload)
            return {
                ...state
            };
        default:
            return state;
    }
}