const initialState = [];

export default function genresList(state = initialState, action) {
    switch(action.type) {
        case 'ADD_GENRES_LIST':
            return action.payload;
        default:
            return state;
    }
}
