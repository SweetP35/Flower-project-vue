<template>
	<div class="navbar">
		<ul class="navbar__information">
			<div class="container">
				<li
					class="navbar__item"
					:class="{ '__active': $route.path === '/about' }"
				>
					<router-link to="/about">
						О нас
					</router-link>
				</li>
				<li
					class="navbar__item"
					:class="{ '__active': $route.path === '/delivery-and-pay' }"
				>
					<router-link to="/delivery-and-pay">
						Доставка и оплата
					</router-link>
				</li>
				<li
					class="navbar__item"
					:class="{ '__active': isOpen }"
				>
					<a
						href="#"
						@click.stop.prevent="authUser ? logout() : openModal()"
					>{{ authUser ? 'Выйти' : 'Войти/Зарегистрироваться' }}</a>
				</li>
			</div>
		</ul>
		<ul class="navbar__menu">
			<div class="container">
				<div class="navbar__menu-wrapper">
					<li class="navbar__logo">
						<router-link to="/">
							Flowers
						</router-link>
					</li>
					<SearchFilter
						:length-array="flowers.length"
						:loading="loading"
						:items="flowers"
						clearable
						@search="onSearch"
					>
						<template #default="{ item }">
							<div
								class="navbar__search-filter"
								@click="navigateToFlowerDetails(item.documentId)"
							>
								<div class="navbar__search-filter__img">
									<img
										:src="item.imageLink"
										alt="Иконка"
									>
								</div>
								<div class="navbar__search-filter__info">
									<div class="navbar__search-filter__title">
										{{ item.title }}
									</div>
									<div class="navbar__search-filter__price">
										{{ formattedPrice(item.price) }} р.
									</div>
								</div>
							</div>
						</template>
					</SearchFilter>
				</div>
				<div
					v-if="authUser"
					class="navbar__counter"
					@click.stop.prevent="router.push('/favorites')"
				>
					<a href=""><img
						class="navbar__img"
						src="../icons/favorite-heart.svg"
						alt="Избранное"
					></a>
					<div
						v-if="authUser.favorites.length"
						class="navbar__counter-number"
					>
						{{ authUser.favorites.length }}
					</div>
				</div>
				<div
					v-if="authUser"
					class="navbar__counter"
					@click.stop.prevent="router.push('/cart')"
				>
					<a href=""><img
						class="navbar__img"
						src="../icons/buy1.svg"
						alt="Корзина"
					></a>
					<div
						v-if="cart.length"
						class="navbar__counter-number"
					>
						{{ cartCount }}
					</div>
				</div>
			</div>
		</ul>
	</div>
	<Modal :model-value="isOpen">
		<Auth
			v-if="!registration"
			v-click-outside="closeModal"
			@open-registration="openRegistration"
			@auth-success="handleAuthSuccess"
		/>
		<Registration
			v-else
			v-click-outside="closeModal"
			@open-auth="openAuth"
			@registration-success="handleRegistrationSuccess"
		/>
	</Modal>
</template>

<script setup>
import { fetchData } from '@/plugins/http'
import SearchFilter from './SearchFilter.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Auth from './Auth.vue'
import Modal from './Modal.vue'
import Registration from './Registration.vue'
import { useStore } from 'vuex'
const store = useStore()
const authUser = computed(() => store.state.user)
console.log(authUser)
const cart = computed(() => store.state.user.cart)
const cartCount = computed(() => cart.value.reduce((acc, item) => acc + item.count, 0))
const isOpen = ref(false)
const router = useRouter()
const flowers = ref([])
const searchQuery = ref('')
let value = 0
const loading = ref(true)
const registration = ref(false)

const openModal = () => {
	isOpen.value = true
}

const logout = () => {
	store.commit('removeUser')
	isOpen.value = false
}

const closeModal = () => {
	isOpen.value = false
	registration.value = false
}

const openRegistration = () => {
	registration.value = true
}

const openAuth = () => {
	registration.value = false
}

const formattedPrice = (price) => {
	return price.toLocaleString()
}

const onSearch = (query) => {
	clearTimeout(value)
	value = setTimeout(() => {
		searchQuery.value = query
		loadFlowers()
	}, 500)
}

const navigateToFlowerDetails = (id) => {
	router.push(`/flower-details/${id}`)
}

const handleRegistrationSuccess = () => {
	registration.value = false
}

const handleAuthSuccess = () => {
	isOpen.value = false
}


const loadFlowers = async () => {
	try {
		loading.value = true
		const data = await fetchData(`http://localhost:1337/api/flowers-lists?filters[title][$containsi]=${searchQuery.value}`, 'GET')
		flowers.value = data.data
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}

loadFlowers()
</script>
