<template>
	<template v-if="loading">
		<div
			v-if="loading"
		>
			<loader/>
		</div>
	</template>
	<template v-if="user.cart.length === 0">
		<div class="no-cart">
			<div class="no-cart__empty">
				<img
					src="../icons/buy1.svg"
					alt=""
				>
				<div class="no-cart__empty-title">
					Нет товаров в корзине
				</div>
			</div>
		</div>
	</template>
	<template v-else>
		<div class="container">
			<div class="cart">
				<div class="cart__title">
					Корзина
				</div>
				<div class="cart__line"/>
				<div class="cart__subtitle">
					{{ user.username }}, здесь представлены товары, которые вы добавили в корзину
				</div>
				<FlowerCarts
					:items="flowerArr"
				/>
				<Pagination
					v-if="totalPage > 1"
					:current-page="currentPage"
					:total-page="totalPage"
					@on-page-change="handlePageChange"
				/>
				<div class="cart__line __bottom"/>
				<div class="cart__footer">
					<div class="cart__total">
						Итого: <span>3000 ₽</span>
					</div>
					<div class="cart__button">
						Оформить заказ
					</div>
				</div>
			</div>
		</div>
	</template>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import FlowerCarts from '../components/FlowerCarts.vue'
import { fetchData } from '@/plugins/http'
import Pagination from '../components/Pagination.vue'
import Loader from '@/components/loader.vue'
const store = useStore()
const user = computed(() => store.state.user)
const flowerArr = ref([])
const currentPage = ref(1)
const totalPage = ref(0)
const loading = ref(true)
const loadFlowersCart = async () => {
	try {
		if (user.value.cart.length === 0) {
			flowerArr.value = []
			return
		}
		const query = user.value.cart
			.map(cart => `filters[id][$in]=${cart.id}`)
			.join('&')
		const response = await fetchData(`http://localhost:1337/api/flowers-lists?${query}&pagination[page]=${currentPage.value}&pagination[pageSize]=6`, 'GET')
		flowerArr.value = response.data
		totalPage.value = response.meta.pagination.pageCount
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}

loadFlowersCart()

watch(currentPage, () => {
	loadFlowersCart()
})

const handlePageChange = (page) => {
	currentPage.value = page
	loadFlowersCart()
}

</script>

