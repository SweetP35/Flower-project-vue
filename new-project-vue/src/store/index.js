import { createStore } from 'vuex'

export default createStore({
	state: {
		user: null
	},
	mutations: {
		setUser(state, user) {
			state.user = user
			localStorage.setItem('user', JSON.stringify(user))
		},
		removeUser(state) {
			state.user = null
			localStorage.removeItem('user')
		},
		checkUser(state) {
			const user = localStorage.getItem('user')
			if (user) {
				state.user = JSON.parse(user)
			}
		}
	}
})
