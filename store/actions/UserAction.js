// export const TOGGLE_USERS = "TOGGLE_USERS";
// import store from "../store";
import db from "../../database/firebaseDb";


export const date_pickup = (date) => {
    return (dispatch, getState) => {
        dispatch({ type: 'DATE_PICKUP', date});
    }
}

export const fetch_userHistory = (history) => {
    return (dispatch, getState) => {
        dispatch({ type: 'FETCHED_USER_HISTORY', history});
    }
}


export const createUser = (userdata) => {
    return (dispatch, getState) => {
        
                dispatch({ type: 'CREATE_USER', userdata});
            }
            // .catch((err) => {
            //     dispatch({type: 'CREATE_USER_ERROR', err})
            // })
    
}
export const fetch_userdetail = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: "FETCHED_USER_DETAIL", data});
    }
}
