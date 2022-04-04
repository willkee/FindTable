const RECEIVED_SETTINGS = '/settings/receivedSettings'

export const gotSettings = (data) => {
    return {
        type: RECEIVED_SETTINGS,
        data
    }
}

export const retrieveSettings = () => async dispatch => {
    const res = await fetch('/api/settings')

    if (res.ok) {
        const data = await res.json()
        console.log("SETTING CONSOLE LOG", data)
        await dispatch(data)
        return data
    }
}

const settingsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVED_SETTINGS: {
            console.log("ACTION DATA!", action.data)
            const newState = { ...state }
            action.data.forEach(setting => newState[setting.id] = setting['type'])
            return newState
        }
        default:
            return state
    }
}

export default settingsReducer
