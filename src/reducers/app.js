import { combineReducers } from 'redux'
import { 
    UPDATE_BASE, UPDATE_IDS, UPDATE_TAF_OB, UPDATE_PANEL, UPDATE_LIST, UPDATE_END_PANEL, UPDATE_PK_END, UPDATE_EPK_MODEL, UPDATE_PK_LIST, UPDATE_BONUS_STATUS, 
    UPDATE_PREHOUR_LIST,UPDATE_USER_MASTER
} from '../actions/app'

function getNewState(state, action, type) {
    return action.type == type ? Object.assign({}, state, action.payload) : state;
}

const base = (state = {
    type: 1
}, action) => {
    return getNewState(state, action, UPDATE_BASE)
}

const rootReducer = combineReducers({
    base
})

export default rootReducer