<template>
	<template
		v-for="flower in items"
		:key="flower.id"
	>
		<FlowerCart
			v-if="getCartItem(flower)?.count > 0"
			:item="flower"
		/>
	</template>
</template>

<script setup>
import { computed } from 'vue'
import FlowerCart from './FlowerCart.vue'
import { useStore } from 'vuex'
defineProps({
	items: {
		type: Array,
		required: true
	}
})
const store = useStore()
const cart = computed(() => store.state.user.cart)
const getCartItem = (item) => {
	return cart.value.find(cartItem => cartItem.id === item.id)
}
</script>
