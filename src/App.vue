<template lang="jade">
	#app
		Toast
		Loading
		comfirm-dialog
		router-view
</template>

<script>
import comfirmDialog from 'components/dialog'
import fixPrivateMode from 'lib/private'
import Loading from 'components/loading'
import setFontSize from 'lib/rem'
import Toast from 'components/toast'
import 'lib/filter'

export default {
	name: 'app',
	components: {
		comfirmDialog,
		Loading,
		Toast
	},
	created () {
		setFontSize()
		fixPrivateMode()
	},
	methods: {
	},
}
</script>

<style lang="stylus">
@import './style/common.styl'
</style>
