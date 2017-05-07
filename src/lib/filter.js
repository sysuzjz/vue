import Vue from 'vue'

const numberBit = (num, bit) => {
	if (typeof num === 'number') {
		return (`00${num}`).substr(-bit)
	}
	else {
		return num
	}
}

Vue.filter('date', (ms, pattern) => {
	if (!ms) {
		return ''
	}
	pattern = pattern || 'YYYY-MM-DD'
	const time = new Date(ms),
		timeStr = pattern
			.replace('YYYY', time.getFullYear())
			.replace('YY', numberBit(time.getFullYear(), 2))
			.replace('MM', numberBit(time.getMonth() + 1, 2))
			.replace('M', time.getMonth() + 1)
			.replace('DD', numberBit(time.getDate(), 2))
			.replace('D', time.getDate())
			.replace('hh', numberBit(time.getHours(), 2))
			.replace('h', time.getHours())
			.replace('mm', numberBit(time.getMinutes(), 2))
			.replace('m', time.getMinutes())
			.replace('ss', numberBit(time.getSeconds(), 2))
			.replace('s', time.getSeconds())
	return timeStr
})
