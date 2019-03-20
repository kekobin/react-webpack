
import jsonp from 'jsonp-pipe'
import Helper from '../assets/js/helper'

export const UPDATE_BASE = 'UPDATE_BASE'
export const UPDATE_IDS = 'UPDATE_IDS'

export const RECEIVE_HOUR_RANK = 'RECEIVE_HOUR_RANK'
export const RECEIVE_USER_MASTER = 'RECEIVE_USER_MASTER'
export const RECEIVE_WINNER_RANK = 'RECEIVE_WINNER_RANK'
export const RECEIVE_DRIVER_RANK = 'RECEIVE_DRIVER_RANK'
export const RECEIVE_DRIVER_MASTER_RANK = 'RECEIVE_DRIVER_MASTER_RANK'

export const updateBase = payload => getAction(UPDATE_BASE, payload)
export const updateIDS = payload => getAction(UPDATE_IDS, payload)

//从接口结果接收数据
export const receiveWinner = payload => getAction(RECEIVE_WINNER_RANK, payload)
export const receiveUserMaster = payload => getAction(RECEIVE_USER_MASTER, payload)

const DEV = process.env.NODE_ENV != 'production';
const baseUrl = '...'

//查询冠军榜概况
export const queryWinnerPreview = (iDay) => (dispatch, getState) => {
    return request(baseUrl + 'queryWinnerPreview?iDay=' + iDay)
    .then(resp => {
        Helper.log('queryWinnerPreview', resp)
        if(resp && resp.status && resp.status == 200) {
            const state = getState()
            dispatch(receiveWinner({list: resp.data}));
        } else {
            console.log("【接口返回出错-queryWinnerPreview", resp.msg)
        }
    })
}

//当前主播的比赛信息
export const queryPresenterMatchInfo = (lPid) => (dispatch, getState) => {
    return request(baseUrl + 'queryPresenterMatchInfo?lPid=' + lPid)
    .then(resp => {
        Helper.log('queryPresenterMatchInfo', resp)
        if(resp && resp.status && resp.status == 200) {
            const data = resp.data;
            dispatch(receiveUserMaster(resp.data));
            //根据当前的天数请求冠军接口
            dispatch(queryWinnerPreview(data.iDay));
        } else {
            console.log("【接口返回出错-queryPresenterMatchInfo", resp.msg)
        }
    })
}

function request(url) {
	return new Promise((resolve, reject) => {
	    jsonp({
		    url: url,
		    cache: true,
		    success:function(resp){
		        resolve(resp)
		    },
		    fail:function(err){
		        reject(err)
		    }
		})
	})
}

function getAction(type, payload) {
    return ({
        type,
        payload
    })
}