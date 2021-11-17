import db from "../../database/firebaseDb";
import { auth } from "../../database/Auth";
import firebase from "firebase";

const initialState ={
    storeHistory: [],
}

const FirebaseReducer = (state= initialState, action) => {
    switch (action.type) {
        case "STORE_HISTORY" :
            
    }
    return state;
}

export default FirebaseReducer;