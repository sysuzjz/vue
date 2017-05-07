// 兼容隐私模式，防止脚本报错
import util from 'lib/util'

const showTip = () => {
	// 隐私模式下调用localStorage时会弹窗
	util.dialog({
		content: '您当前处于隐私模式中，部分功能可能没法使用。为了让您享受更好的体验，请退出隐私模式重新进入',
		confirmText: '知道了',
		dialogType: 'single-btn'
	})
}

const fixPrivateMode = () => {
	if (util.isPrivateMode()) {
		window.localStorage.setItem = showTip
		window.sessionStorage.setItem = showTip
		window.localStorage.removeItem = () => {}
		window.sessionStorage.removeItem = () => {}
		window.localStorage.getItem = () => undefined
		window.sessionStorage.getItem = () => undefined
	}
}

export default fixPrivateMode
