<template>
	<div class="flower-card">
		<div class="flower-card__img">
			<img
				:src="item.imageLink"
				alt=""
			>
		</div>
		<div
			class="flower-card__wrapper"
			@click.stop
		>
			<div class="flower-card__info">
				<div class="flower-card__title">
					{{ item.title }}
				</div>
				<div class="flower-card__price">
					{{ formattedPrice }} р.
				</div>
			</div>
			<div
				v-if="user"
				class="flower-card__actions"
			>
				<div
					v-if="count < 1"
					class="flower-card__button"
					@click.stop="addToCart()"
				>
					В корзину
				</div>
				<CounterButton
					v-else
					:count="count"
					@remove="decreaseCount"
					@add="increaseCount"
				/>
				<img
					class="flower-card__favorite"
					:src="isFavorite ? favoriteOn : favoriteOff"
					alt="favorite"
					@click.stop="toggleFavorite(item)"
				>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import favoriteOn from '../icons/heart-on.svg'
import favoriteOff from '../icons/heart-off.svg'
import CounterButton from './CounterButton.vue'
import { useStore } from 'vuex'
import { fetchData } from '@/plugins/http'
const props = defineProps({
	item: {
		type: Object,
		required: true
	}
})
const store = useStore()
const user = computed(() => store.state.user)
let cart = user.value?.cart || []
watch(user, () => {
	cart = [...user.value.cart]
})


const formattedPrice = computed(() => {
	return props.item.price.toLocaleString()
})

const isFavorite = computed(() => {
	if (!user.value) return false
	const favorite = (user.value.favorites || []).find(f => Number(f) === Number(props.item.id))
	return favorite !== undefined
})

const toggleFavorite = async () => {
	let favorites = user.value.favorites
	if (isFavorite.value) {
		favorites = favorites.filter(f => Number(f) !== Number(props.item.id))
	} else {
		favorites.push(Number(props.item.id))
	}
	await fetchData(`http://localhost:1337/api/users/${user.value.id}`, 'put', { favorites: favorites })
	store.commit('setUser', { ...user.value, favorites: favorites })
	isFavorite.value = !isFavorite.value
}

const isInCart = computed(() => {
	if (!user.value) return false
	const isInCart = (user.value.cart || []).find(item => Number(item.id) === Number(props.item.id))
	return isInCart !== undefined
})

const getCartItem = () => {
	if (isInCart.value) {
		return cart.find(item => Number(item.id) === Number(props.item.id))
	}
	return { id: props.item.id, count: 0 }
}
const count = ref(getCartItem().count)

const addToCart = () => {
	count.value = 1
	cart.push({
		id: props.item.id,
		count: count.value
	})
	changeCount()
}

const increaseCount = (value) => {
	count.value = value
	getCartItem().count = value
	changeCount()
}

const decreaseCount = (value) => {
	count.value = value
	if (isInCart.value && count.value === 0){
		cart = cart.filter(item => Number(item.id) !== Number(props.item.id))
	} else {
		getCartItem().count = value
	}
	changeCount()
}

let changeCountTimeout = ref(0)
const changeCount = async () => {
	clearTimeout(changeCountTimeout.value)
	changeCountTimeout.value = setTimeout(async () => {
		await fetchData(`http://localhost:1337/api/users/${user.value.id}`, 'put', { cart: cart })
		store.commit('setUser', { ...user.value, cart: cart })
	}, 1000)
}


</script>
