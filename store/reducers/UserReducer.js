import { TOGGLE_USERS } from "../actions/UserAction"

const initialState ={
    // meals: MEALS,
    users: [],
}

const UserReducer = (state= initialState, action) => {
    switch (action.type) {
        case TOGGLE_USERS :
            const updateUser = [...state.users]
            console.log(state.users)
            return {...state, users: updateUser}
            
    }
    return state
}
export default UserReducer;