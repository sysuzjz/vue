<!-- 对话框组件，含单选对话框和双选对话框 -->
<template lang="jade">
	.dialog-wrap(v-if="showing")
		.mask
		.dialog
			.dialog-header(v-if="header") {{header}}
			.dialog-content
				div(v-html="content")
				slot(name="dialog-content")
			.dialog-buttons.clearfix(:class="dialogType")
				button.btn-cancel(v-if="dialogType === 'double-btn'", @click="cancelHandler") {{cancelText}}
				button.btn-confirm(@click="confirmHandler") {{confirmText}}
</template>

<script>
import util from 'lib/util'

export default {
	name: 'dialog',
	data () {
		return {
			showing: false,
			defaultOption: {
				header: '',
				content: '',
				cancelText: '取消',
				confirmText: '确认',
				cancelCallback: this.hide,
				confirmCallback: this.hide,
				dialogType: 'double-btn'
			}
		}
	},
	methods: {
		show (customOption) {
			const self = this
			const option = Object.assign({}, this.defaultOption, util.objectFilter(customOption))
			Object.keys(option).forEach((key) => {
				self[key] = option[key]
			})
			this.showing = true
		},
		hide () {
			this.showing = false
		},
		cancelHandler () {
			this.cancelCallback && this.cancelCallback(this)
		},
		confirmHandler () {
			this.confirmCallback && this.confirmCallback(this)
		}
	},
	created () {
		const vue = util.getInstance()
		vue.$on('dialog', this.show)
	}
}
</script>

<style lang="stylus">
.dialog-wrap
	.dialog
		position fixed
		top 50%
		left 50%
		width 80%
		max-width 320px
		transform translate(-50%, -50%)
		background-color #FFF
		border-radius 5px
		overflow hidden
		z-index 200
		.dialog-header
			font-size 22px
			line-height 32px
			text-align center
			padding 10px
			border-bottom 1.5px solid #d2d2d2
		.dialog-content
			font-size 15px
			line-height 20px
			padding 20px 15px
			border-bottom 1.5px solid #b2b2b2
			word-wrap break-word
		.dialog-buttons
			button
				float left
				width 49.9%
				font-size 16px
				padding 12px 0
				border 0
				outline none
				background-color #FFF
				&.btn-cancel
					color #acacac
					// color #b2b2b2
			.btn-confirm
				color #157efb
				border-left 1.5px solid #b2b2b2
			&.single-btn
				height 46px
				overflow hidden
				button
					width 100%

</style>
