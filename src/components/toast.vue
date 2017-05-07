<!-- toast组件，默认2s隐藏 -->
<template lang="jade">
	.toast-wrap(v-if="showing")
		.mask
		.content
			p.toast-tip {{content}}
</template>

<script>
	import util from 'lib/util'
	let timer = null
	export default {
		name: 'toast',
		created () {
			const vue = util.getInstance()
			vue.$on('toast', this.show)
		},
		data () {
			return {
				content: '',
				showing: false
			}
		},
		methods: {
			show (content, duration, callback) {
				this.content = content
				this.showing = true
				const timeout = duration || 2000

				if (timer) {
					clearTimeout(timer)
				}
				const self = this
				timer = setTimeout(() => {
					self.hide()
					callback && callback()
				}, timeout)
			},
			hide () {
				this.content = ''
				this.showing = false
			}
		},
		beforeDestroy () {
			clearTimeout(timer)
		}
	}
</script>
<style lang="stylus">
	.toast-wrap
		.content
			position fixed
			top 50%
			left 50%
			width 90%
			height auto
			max-width 90%
			text-align center
			transform translate(-50%, -50%)
			z-index 990
			.toast-tip
				display inline-block
				background-color #333
				color #FFF
				padding 8px 10px
				font-size 16px
				border-radius 8px
</style>
