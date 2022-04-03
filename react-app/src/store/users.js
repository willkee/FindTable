// constants
const GET_USERS = "/users/GET_USERS"
const ADD_USER = "/users/ADD_USER"
// const UPDATE_USER = "/users/UPDATE_USER"
// const DELETE_USER = "/users/DELETE_USER"

const getUsers = (data) => ({
  type: GET_USERS,
  users_data
});

const AddUser = (data) => ({
  type: ADD_USER,
  data
})

export const allUsers = () => async dispatch => {
    const res = await fetch('/api/users', {
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        const data = await res.json()

        if (data.errors) return

        dispatch(getUsers(data))
    }
}

export default function userReducer(state = {}, action) {
    switch(action.type) {
        case GET_USERS:
            newState = { ...state, users: action.users_data }
            return newState
        default:
            return state
    }
}
