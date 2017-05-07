import api from 'api/user'
import Router from 'vue-router'
import Vue from 'vue'

const {originPath, apiPath} = require('config/api.config')

// 进入页面前验证
export const requireAuth = (to, from, next) => {
	api.getUserInfo().then(() => {
		next(true)
	}, () => {
		window.location.href = `${originPath}/user-login.html?back_act=${encodeURIComponent(`${apiPath}/#${to.fullPath}`)}`
	})
}

/* 根据每个文件的文件名和路由的name，匹配相应的page，并修改name使name独一无二
 * 示例：router/user.js里的{name: 'profile'}会自动加载 page/user/profile.vue并将router名改为userProfile
 */
const routerContext = require.context('./', false, /\.js$/)

let routers = []

const generateComponents = (routerItem, routerName) => {
	return resolve => require.ensure([], () => resolve(require(`src/page/${routerName}/${routerItem.name}`)))
}

routerContext.keys().forEach((key) => {
	const routerName = key.match(/^\.\/(.*?)\.js$/)[1]
	// 不包含本身
	if (routerName !== 'index') {
		let routerPayload = routerContext(key)['default']

		routerPayload = routerPayload.map((routerItem) => {
			const component = generateComponents(routerItem, routerName)
			return Object.assign({}, routerItem, {
				name: `${routerName}${routerItem.name.substr(0, 1).toUpperCase()}${routerItem.name.substr(1).toLowerCase()}`,
				component: component
			})
		})
		routers = routers.concat(routerPayload)
	}
})
Vue.use(Router)

const router = new Router({
	routes: routers
})

export default router
