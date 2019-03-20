import { combineReducers } from 'redux'
import { 
    UPDATE_BASE, UPDATE_IDS,RECEIVE_USER_MASTER,RECEIVE_HOUR_RANK, RECEIVE_WINNER_RANK,RECEIVE_DRIVER_RANK, RECEIVE_DRIVER_MASTER_RANK
} from '../actions/mapp'

function getNewState(state, action, type) {
    return action.type == type ? Object.assign({}, state, action.payload) : state;
}

const winnerRank = (state = {list:[]}, action) => getNewState(state, action, RECEIVE_WINNER_RANK)

const hourRank = (state = {
    iHour:0,
    list:[],
    current:[],
    loadMore: true
}, action) => getNewState(state, action, RECEIVE_HOUR_RANK)

const rootReducer = combineReducers({
    hourRank
})

export default rootReducer