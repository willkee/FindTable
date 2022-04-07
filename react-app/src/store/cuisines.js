const RECEIVED_CUISINES = '/cuisines/receivedCuisines'

const gotCuisines = (data) => {
    return {
        type: RECEIVED_CUISINES,
        data
    }
}

export const retrieveCusines = () => async dispatch => {
    const res = await fetch('/api/cuisines/')

    if (res.ok) {
        const data = await res.json()
        await dispatch(gotCuisines(data.cuisines))
        return data
    }
}

const cuisinesReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVED_CUISINES: {
            const newState = { ...state }
            action.data.forEach(cuisine => newState[cuisine.id] = cuisine)
            return newState
        }
        default:
            return state
    }
}

export default cuisinesReducer
