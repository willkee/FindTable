const RECEIVED_SETTINGS = '/settings/receivedSettings'

const gotSettings = (data) => {
    type: RECEIVED_SETTINGS,
    data
}
