import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import UserReducer from "./reducers/UserReducer";
import recipeReducer from "./reducers/recipeReducer";
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    user: UserReducer,
    recipes: recipeReducer,
    })
  

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;