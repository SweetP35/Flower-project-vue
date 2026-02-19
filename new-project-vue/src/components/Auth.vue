<template>
	<form
		class="auth"
		@submit.prevent="submitForm"
	>
		<div class="auth__title">
			Авторизация
		</div>
		<div class="auth__subtitle">
			Впервые на сайте? <a
				class="auth__subtitle-link"
				href="#"
				@click.stop="openRegistration"
			>Зарегистрируйтесь.</a>
		</div>
		<div class="auth__form">
			<input
				v-model="fields.email"
				type="text"
				placeholder="Email"
				@input="clearEmailError"
			>
			<p>{{ errors.email }}</p>
		</div>
		<div class="auth__form">
			<input
				v-model="fields.password"
				type="password"
				placeholder="Пароль"
				@input="clearPasswordError"
			>
			<p>{{ errors.password }}</p>
		</div>
		<div class="auth__form">
			<button>Войти</button>
			<p>{{ errors.general }}</p>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue'
import { fetchData } from '@/plugins/http'
const emit = defineEmits(['open-registration', 'auth-success'])
import { useStore } from 'vuex'
const store = useStore()
const openRegistration = () => {
	emit('open-registration')
}
const errors = ref({
	email: '',
	password: '',
	general: ''
})
const fields = ref({
	email: '',
	password: ''
})

const isValidEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return re.test(email)
}

const validateForm = () => {
	errors.value.email = ''
	errors.value.password = ''
	errors.value.general = ''
	if (!fields.value.email || !fields.value.password) {
		errors.value.email = 'Поле обязательно для заполнения'
		errors.value.password = 'Поле обязательно для заполнения'
	}
	if (!isValidEmail(fields.value.email)) {
		errors.value.email = 'Неверный формат email'
	}
	if (fields.value.password.length < 6) {
		errors.value.password = 'Пароль должен содержать не менее 6 символов'
	}
	if (errors.value.email || errors.value.password) {
		errors.value.general = 'Пожалуйста, исправьте ошибки в форме'
	}
}

const clearEmailError = () => {
	errors.value.email = ''
	errors.value.general = ''
}

const clearPasswordError = () => {
	errors.value.password = ''
	errors.value.general = ''
}



const submitForm = async () => {
	validateForm()
	if (!errors.value.email && !errors.value.password){
		try {
			const response = await fetchData('http://localhost:1337/api/auth/local', 'POST', {
				identifier: fields.value.email, password: fields.value.password
			})
			store.commit('setUser', response.user)
			emit('auth-success')
			console.log(response)
		} catch (error) {
			console.error(error)
			errors.value.general = 'Неверный email или пароль'
		}
	}
}





</script>
