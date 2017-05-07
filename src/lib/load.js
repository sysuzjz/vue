// 加载文件
const scriptCache = new Map()

const load = {
	getScript (url, success, error) {
		return new Promise((resolve) => {
			if (scriptCache.get(url)) {
				success && success()
				resolve()
			}
			else {
				const script = document.createElement('script')
				document.getElementsByTagName('head')[0].appendChild(script)
				script.addEventListener('load', () => {
					scriptCache.set(url, true)

					success && success()
					resolve()
				})
				script.src = url

				script.addEventListener('error', error)
			}
		})
	},
	// 注：该方法可以用于请求不需返回的url，例如刷缓存
	getImg (url, success, error) {
		return new Promise((resolve) => {
			const img = new Image()

			img.addEventListener('load', () => {
				// 把图片临时插入到DOM中，用于计算图片原始体积
				img.style.visibility = 'hidden'
				img.style.position = 'fixed'
				document.body.appendChild(img)
				success && success(img.getBoundingClientRect())
				resolve(img.getBoundingClientRect())
				// promise返回后移除图片
				img.parentNode.removeChild(img)
			})

			img.addEventListener('error', error)

			img.setAttribute('src', url)
		})
	},
}

export default load
