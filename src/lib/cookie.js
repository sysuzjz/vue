import Vue from 'vue'
import vueCookie from 'vue-cookie'
import util from './util'
Vue.use(vueCookie)

const vue = util.getInstance()

// https://www.npmjs.com/package/vue-cookie
// 实际调用：https://www.npmjs.com/package/tiny-cookie
// cookie默认保存30天
const defaultOption = {
	expires: 30,
	domain: '.abc.cn',
	path: '/'
}

const cookie = {
	get (key) {
		return vue.$cookie.get(key)
	},
	set (key, value, option = {}) {
		return vue.$cookie.set(key, value, Object.assign({}, defaultOption, option))
	},
	delete (key) {
		return cookie.set(key, '', {
			expires: '-1D'
		})
		// 默认的delete删除无效
		// return vue.$cookie.delete(key)
	}
}

export default cookie
