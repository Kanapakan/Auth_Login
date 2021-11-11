export const TOGGLE_USERS = "TOGGLE_USERS";

export const toggleUsers = (userArr) => {
    return { type: TOGGLE_USERS, user: userArr };

}