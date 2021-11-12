// import { TOGGLE_USERS } from "../actions/UserAction"

const initialState ={
    // meals: MEALS,
    user: []
}

const UserReducer = (state= initialState, action) => {
    switch (action.type) {
        case "TOGGLE_USERS" :
            // const updateUser = [...state.users]
            // console.log('user in reducer' + state.users)
            return state.concat([action.user]);
        default:
            return state
    }
    
}
export default UserReducer;