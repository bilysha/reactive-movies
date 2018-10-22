export const switchActiveFilter = (filter) => dispatch => {
        dispatch({type: 'SWITCH_ACTIVE_FILTER', payload: filter });
};