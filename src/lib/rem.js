import remConfig from '../../config/rem.config'

const setFontSize = () => {
	const {remUnit, remWidth, maxWidth} = remConfig,
		root = document.documentElement,
		clientWidth = Math.min(root.clientWidth, maxWidth)

	root.style.fontSize = `${clientWidth * remUnit / remWidth}px`
}

export default () => {
	setFontSize()
	window.addEventListener('resize', setFontSize, false)
}
