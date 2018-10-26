const initialState = {
    movies: [],
    pages: {},
    activePage: null,
    collection: {}
};

export default function moviesList(state = initialState, action) {
    switch(action.type) {
        case 'ADD_MOVIES_LIST':
            return {
                ...state,
                movies: action.payload.results,
                pages: action.payload.total_pages,
                activePage: action.payload.page
            };
        case 'CLEAR_MOVIES_LIST':
            return initialState;
        case 'ADD_COLLECTION':
            return {
                ...state,
                movies: action.payload.parts,
                collection: {
                    name: action.payload.name,
                    backdrop_path: action.payload.backdrop_path,
                    overview: action.payload.overview
                }
            };
        default:
            return state;
    }
}
