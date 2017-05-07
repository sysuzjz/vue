// 项目结构参照https://vuex.vuejs.org/zh-cn/structure.html
import Vue from 'vue'
import Vuex from 'vuex'
import {actions, getters} from './common'

const modulesContext = require.context('./modules', false, /\.js$/)
const modules = modulesContext.keys().reduce((module, key) => {
	const moduleName = key.match(/^\.\/(.*?)\.js$/)[1]
	const modulePayload = modulesContext(key)['default']
	module[moduleName] = modulePayload
	return module
}, {})

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
	strict: debug,
	actions,
	getters,
	modules
})
