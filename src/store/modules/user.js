import {userTypes as types} from '../types'
import api from 'api/user'

const state = {
	isLogin: false,
	userInfo: {}
}
const mutations = {
	[types.SET_USER_INFO] (state, data) {
		state.isLogin = true
		state.userInfo = data
	},
	[types.CLEAR_USER_INFO] (state) {
		state.isLogin = false
		state.userInfo = {}
	}
}
const getters = {
	[types.IS_LOGIN] (state) {
		return state.isLogin
	},
	[types.GET_USER_INFO] (state) {
		return state.userInfo
	}
}
const actions = {
	async [types.LOGIN] ({commit, state}, data) {
		try {
			const userInfo = await api.login(data)
			commit(types.SET_USER_INFO, userInfo)
		}
		catch (err) {
			// catch有两种情况，一种网络异常，一种非正常状态码
			if (err.code) {
				// 处理异常code
			}
			else {
				// 网络异常，已经有通用提示
			}
		}
	},
	[types.GET_USER_INFO] ({commit}, data) {
		return new Promise((resolve, reject) => {
			api.getUserInfo(data).then((data) => {
				commit(types.SET_USER_INFO, data)
				resolve(data)
			}, (res) => {
				commit(types.CLEAR_USER_INFO)
				reject && reject(res)
			})
		})
	}
}
export default {
	state,
	getters,
	mutations,
	actions
}
