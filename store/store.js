import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import UserReducer from "./reducers/UserReducer";
import recipeReducer from "./reducers/recipeReducer";
import FirebaseReducer from "./reducers/firebaseReducer";
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import db from '../database/firebaseDb'

const rootReducer = combineReducers({
    user: UserReducer,
    recipes: recipeReducer,
    storeHis: FirebaseReducer,
    })
  
// const store = createStore(rootReducer,
//     compose(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
//     reduxFirestore(db),
//     reactReduxFirebase(db)
//     ) );
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;