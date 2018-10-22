const initialState = [];

export default function moviesList(state = initialState, action) {
    switch(action.type) {
        case 'ADD_MOVIES_LIST':
            return action.payload;
        default:
            return state;
    }
}
