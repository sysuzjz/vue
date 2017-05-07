<!-- 测试用页面 -->
<template lang="jade">
	.test
		p(@click="toastMsg") toast test {{userInfo.userName}}
		p(@click="login") action test
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {userTypes as types} from 'store/types'

export default {
	name: 'hello',
	computed: {
		...mapGetters({
			userInfo: [types.GET_USER_INFO]
		}),
	},
	data () {
		return {
		}
	},
	methods: {
		...mapActions([types.LOGIN]),
		toastMsg () {
			this.toast('toast', 2000)
		},
		login () {
			// console.log(this.$store)
			this.$store.dispatch(types.LOGIN, {
				name: 'abc',
				password: 'aaa'
			})
		}

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.test
	p
		font-size 50px
</style>
