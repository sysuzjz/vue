<!-- 带倒计时功能的按钮 -->
<!-- click函数需要返回true才能开启倒计时 -->
<template lang="jade">
	button.smart-button(:class="[className, disabled && disabledClass]", @click="clickHandler") {{remain ? remain + '秒后重试' : buttonText}}
</template>
<script type="text/javascript">

export default {
	name: 'smartButton',
	data () {
		return {
			interval: null,
			remain: 0,
			disabled: false
		}
	},
	props: {
		buttonText: String,
		timeout: Number,
		className: {
			type: String,
			default: ''
		},
		disabledClass: {
			type: String,
			default: ''
		},
		click: {
			type: Function
		}
	},
	methods: {
		clickHandler () {
			if (this.remain === 0) {
				if (!this.click) {
					return
				}
				// 函数返回true时开启倒计时
				if (this.click()) {
					this.setInterval()
				}
			}
		},
		setInterval () {
			const self = this

			this.remain = this.timeout
			this.disabled = true

			this.interval = setInterval(() => {
				self.remain--
				if (self.remain === 0) {
					clearInterval(self.interval)
					self.disabled = false
					return
				}
			}, 1000)
		}
	},
	beforeDestroy () {
		clearInterval(this.interval)
	}

}
</script>
<style lang="stylus">
</style>
