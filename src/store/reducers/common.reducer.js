const initialState = '';

export default function common(state = initialState, action) {
    switch(action.type) {
        case 'SWITCH_ACTIVE_FILTER':
            return action.payload;
        default:
            return state;
    }
}