export const UPDATE_BASE = 'UPDATE_BASE'
export const UPDATE_IDS = 'UPDATE_IDS'
export const UPDATE_TAF_OB = 'UPDATE_TAF_OB'
export const UPDATE_PANEL = 'UPDATE_PANEL'
export const UPDATE_LIST = 'UPDATE_LIST'
export const UPDATE_END_PANEL = 'UPDATE_END_PANEL'
export const UPDATE_EPK_MODEL = 'UPDATE_EPK_MODEL'
export const UPDATE_PK_END = 'UPDATE_PK_END'
export const UPDATE_PK_LIST = 'UPDATE_PK_LIST'
export const UPDATE_BONUS_STATUS = 'UPDATE_BONUS_STATUS'
export const UPDATE_PREHOUR_LIST = 'UPDATE_PREHOUR_LIST'
export const UPDATE_USER_MASTER = 'UPDATE_USER_MASTER'

export const updateBase = payload => getAction(UPDATE_BASE, payload)
export const updateIDS = payload => getAction(UPDATE_IDS, payload)
export const updateTafOb = payload => getAction(UPDATE_TAF_OB, payload)
export const updatePanel = payload => getAction(UPDATE_PANEL, payload)
export const updateList = payload => getAction(UPDATE_LIST, payload)
export const updateEndPanel = payload => getAction(UPDATE_END_PANEL, payload)
export const updatePkModel = payload => getAction(UPDATE_EPK_MODEL, payload)
export const updatePkEnd = payload => getAction(UPDATE_PK_END, payload)
export const updatePkList = payload => getAction(UPDATE_PK_LIST, payload)
export const updateBonusStatus = payload => getAction(UPDATE_BONUS_STATUS, payload)
export const updatePreHourList = payload => getAction(UPDATE_PREHOUR_LIST, payload)
export const updateUserMaster = payload => getAction(UPDATE_USER_MASTER, payload)


function getAction(type, payload) {
    return ({ type, payload })
}