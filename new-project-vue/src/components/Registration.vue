<template>
	<form
		class="registration"
		@submit.prevent="submitForm"
	>
		<div class="registration__title">
			Регистрация
		</div>
		<div class="registration__subtitle">
			Если у вас есть аккаунт - <a
				href="#"
				@click.stop.prevent="openAuth"
			>авторизуйтесь</a>
		</div>
		<div class="registration__form">
			<input
				v-model="fields.name"
				type="text"
				placeholder="Введите имя и фамилию"
				@input="clearNameError"
			>
			<p>{{ errors.name }}</p>
		</div>
		<div class="registration__form">
			<input
				v-model="fields.email"
				type="text"
				placeholder="Введите Email"
				@input="clearEmailError"
			>
			<p>{{ errors.email }}</p>
		</div>
		<div class="registration__password">
			<div class="registration__form">
				<input
					v-model="fields.password"
					type="password"
					placeholder="Введите пароль"
					@input="clearPasswordError"
				>
				<p>{{ errors.password }}</p>
			</div>
			<div class="registration__form">
				<input
					v-model="fields.confirmPassword"
					type="password"
					placeholder="Подтвердите пароль"
					@input="clearConfirmPasswordError"
				>
				<p>{{ errors.confirmPassword }}</p>
			</div>
		</div>
		<div class="registration__form">
			<button>Зарегистрироваться</button>
			<p>{{ errors.general }}</p>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue'
import { fetchData } from '@/plugins/http'
const emit = defineEmits(['open-auth', 'registration-success'])
const errors = ref({
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
	general: ''
})
const fields = ref({
	name: '',
	email: '',
	password: '',
	confirmPassword: ''
})

const openAuth = () => {
	emit('open-auth')
}

const isValidEmail = (email) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return re.test(email)
}

const validateForm = () => {
	errors.value.name = ''
	errors.value.email = ''
	errors.value.password = ''
	errors.value.confirmPassword = ''
	errors.value.general = ''
	if (!fields.value.name || !fields.value.email || !fields.value.password || !fields.value.confirmPassword) {
		errors.value.name = 'Поле обязательно для заполнения'
		errors.value.email = 'Поле обязательно для заполнения'
		errors.value.password = 'Поле обязательно для заполнения'
		errors.value.confirmPassword = 'Поле обязательно для заполнения'
	}
	if (!isValidEmail(fields.value.email)) {
		errors.value.email = 'Неверный формат email'
	}
	if (fields.value.password.length < 6) {
		errors.value.password = 'Пароль должен содержать не менее 6 символов'
	}

	if (fields.value.name.length < 3) {
		errors.value.name = 'Имя должно содержать не менее 3 символов'
	}

	if (fields.value.password !== fields.value.confirmPassword) {
		errors.value.confirmPassword = 'Пароли не совпадают'
	}
	if (errors.value.name || errors.value.email || errors.value.password || errors.value.confirmPassword) {
		errors.value.general = 'Пожалуйста, исправьте ошибки в форме'
	}
}

const clearNameError = () => {
	errors.value.name = ''
	errors.value.general = ''
}

const clearEmailError = () => {
	errors.value.email = ''
	errors.value.general = ''
}

const clearPasswordError = () => {
	errors.value.password = ''
	errors.value.general = ''
}

const clearConfirmPasswordError = () => {
	errors.value.confirmPassword = ''
	errors.value.general = ''
}

const submitForm = async () => {
	validateForm()
	if (!errors.value.name && !errors.value.email && !errors.value.password && !errors.value.confirmPassword){
		try {
			const response = await fetchData('http://localhost:1337/api/auth/local/register', 'POST', {
				username: fields.value.name, email: fields.value.email, password: fields.value.password
			})
			emit('registration-success')
			fields.value = {
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			}
			errors.value.general = 'Вы успешно зарегистрировались'
			console.log(response)
		} catch (error) {
			console.error(error)
			errors.value.general = 'Пользователь с таким email или именем уже существует'
		}
	}
}



</script>
