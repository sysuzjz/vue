<!-- 全局loading -->
<template lang="jade">
	.loading-wrap(v-if="showing")
		.mask
		.content
			img(src="../image/loading.gif")
</template>

<script>
	import util from 'lib/util'
	export default {
		name: 'loading',
		created () {
			const vue = util.getInstance()
			vue.$on('showLoading', this.show)
			vue.$on('hideLoading', this.hide)
		},
		data () {
			return {
				showing: false
			}
		},
		methods: {
			show () {
				this.showing = true
			},
			hide () {
				this.showing = false
			}
		}
	}
</script>
<style lang="stylus">
	.loading-wrap
		.content
			position fixed
			top 50%
			left 50%
			width 30%
			max-width 300px
			height auto
			transform translate(-50%, -50%)
			z-index 250
			img
				width 100%
</style>
