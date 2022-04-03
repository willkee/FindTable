// constants
const RETRIEVED_USERS = "/users/RETRIEVED_USERS"
const ADDED_USER = "/users/ADDED_USER"
// const UPDATED_USER = "/users/UPDATED_USER"
// const DELETED_USER = "/users/DELETED_USER"

const retrievedUsers = (users_data) => ({
  type: RETRIEVED_USERS,
  users_data
});

// const AddedUser = (data) => ({
//   type: ADDED_USER,
//   data
// })

export const allUsers = () => async dispatch => {
    const res = await fetch('/api/users/')

    if (res.ok) {
        const data = await res.json()
        dispatch(retrievedUsers(Object.values(data)[0]))
        return data
    }
}

export default function userReducer(state = {}, action) {
    const newState = { ...state }
    switch(action.type) {

        case RETRIEVED_USERS:
            console.log(action.users_data)
            action.users_data.forEach(user => newState[user.id] = user)
            return newState
        case ADDED_USER:
            return state
        default:
            return state
    }
}
