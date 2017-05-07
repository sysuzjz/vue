import {requireAuth} from './index'

export default [{
	path: '/profile',
	name: 'profile',
	beforeEnter: requireAuth
}]
