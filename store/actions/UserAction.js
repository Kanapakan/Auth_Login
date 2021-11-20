// export const TOGGLE_USERS = "TOGGLE_USERS";
// import store from "../store";
import { fetched_recipeHistory } from "./recipeAction";
import {firebase} from "../../database/firebaseDb";

const db = firebase.firestore()

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

// export const thunk_action_userHistory = userHistory => {
//     const sumNutrient = userHistory.sumNutrient
//     const allRecipes = userHistory.recipes
//     const sumCal = userHistory.sumCal
//     return function(dispatch, getState){

//         dispatch(fetched_recipeHistory(allRecipes, sumNutrient, sumCal))
//         // dispatch(toggleMealTime(sumCal))
//     }

// }