<template>
	<div class="container">
		<div class="flower-cart">
			<div class="flower-cart__wrapper">
				<div class="flower-cart__img">
					<img
						:src="item.imageLink"
						alt=""
					>
				</div>
				<div class="flower-cart__title">
					{{ item.title }}
				</div>
				<div class="flower-cart__price">
					{{ item.price.toLocaleString() }} ₽
				</div>
				<CounterButton
					:count="count"
					@remove="decreaseCount"
					@add="increaseCount"
				/>
			</div>
		</div>
	</div>
</template>



<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import CounterButton from './CounterButton.vue'
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

const increaseCount = (value) => {
	count.value = value
	getCartItem().count = value
	changeCount()
}

const decreaseCount = (value) => {
	count.value = value
	if (isInCart.value && count.value === 0) {
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
