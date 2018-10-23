const initialState = {
    movies: [],
    pages: {},
    activePage: null
};

export default function moviesList(state = initialState, action) {
    switch(action.type) {
        case 'ADD_MOVIES_LIST':
            return {
                movies: action.payload.results,
                pages: action.payload.total_pages,
                activePage: action.payload.page
            };
        case 'CLEAR_MOVIES_LIST':
            return initialState;
        default:
            return state;
    }
}
