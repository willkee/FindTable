const RECEIVED_SETTINGS = '/settings/receivedSettings'

const gotSettings = (data) => {
    return {
        type: RECEIVED_SETTINGS,
        data
    }
}

export const retrieveSettings = () => async dispatch => {
    const res = await fetch('/api/settings/')

    if (res.ok) {
        const data = await res.json()
        await dispatch(gotSettings(data.settings))
        return data
    }
}

const settingsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVED_SETTINGS: {
            const newState = { ...state }
            action.data.forEach(setting => newState[setting.id] = setting)
            return newState
        }
        default:
            return state
    }
}

export default settingsReducer
