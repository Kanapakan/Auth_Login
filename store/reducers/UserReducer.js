// import { TOGGLE_USERS } from "../actions/UserAction"

const initialState ={
    // meals: MEALS,
    user: {},
    isLoading: false,
    isError: false,
    userHistory: {},
    userDetail :{},
    datePick: "",
}

const UserReducer = (state= initialState, action) => {
    switch (action.type) {
        case "CREATE_USER" :
            console.log('created user', action.userdata);
            return {user: action.userdata};
        case "FETCHED_USER_HISTORY" :
            console.log('user history', action.history);
            return {userHistory: action.history};
        case "FETCHED_USER_DETAIL" :
            console.log('created user', action.data);
            return {userDetail: action.data};
        case "DATE_PICKUP" :
            console.log('Pick date : ', action.date);
            return {datePick: action.date};
        default:
            return state
    }
    
}
export default UserReducer;