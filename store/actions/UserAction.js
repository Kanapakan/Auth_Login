
export const date_pickup = (date) => {
    return (dispatch, getState) => {
        dispatch({ type: 'DATE_PICKUP', date});
    }
}

