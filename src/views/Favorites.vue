<template>
	<div
		v-if="loading"
	>
		<loader/>
	</div>
	<template v-else>
		<template v-if="user.favorites?.length">
			<div class="container">
				<div class="favorites">
					<div class="favorites__title">
						Избранное
					</div>
					<div class="favorites__line"/>
					<div class="favorites__subtitle">
						{{ user.username }}, здесь представлены ваши любимые товары
					</div>
				</div>
				<FlowersCards
					:items="flowersfavoritesArr"
					:loading="loading"
				/>
				<Pagination
					v-if="totalPage > 1"
					:current-page="currentPage"
					:total-page="totalPage"
					@on-page-change="handlePageChange"
				/>
			</div>
		</template>
		<div
			v-else
			class="no-favorites"
		>
			<div class="no-favorites__empty">
				<img
					src="../icons/heart-off.svg"
					alt=""
				>
				<div class="no-favorites__empty-title">
					Нет избранных товаров
				</div>
			</div>
		</div>
	</template>
</template>

<script setup>
import FlowersCards from '@/components/FlowersCards.vue'
import { fetchData } from '@/plugins/http'
import { computed, ref, watch } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { useStore } from 'vuex'
import Loader from '@/components/loader.vue'
const store = useStore()
const user = computed(() => store.state.user)
const favorites = computed(() => user.value.favorites || [])
const flowersfavoritesArr = ref([])
const currentPage = ref(1)
const totalPage = ref(0)
const loading = ref(true)
const loadFlowersFavorites = async (newFavorites) => {
	try {
		if (newFavorites.length === 0) {
			flowersfavoritesArr.value = []
			return
		}
		const query = newFavorites
			.map(favorite => `filters[id][$in]=${favorite}`)
			.join('&')
		const response = await fetchData(`http://localhost:1337/api/flowers-lists?${query}&pagination[page]=${currentPage.value}&pagination[pageSize]=6`, 'GET')
		flowersfavoritesArr.value = response.data
		totalPage.value = response.meta.pagination.pageCount
	} catch (error) {
		console.log(error)
	} finally {
		loading.value = false
	}
}
const handlePageChange = (page) => {
	currentPage.value = page
	loadFlowersFavorites(favorites.value)
}

watch (favorites, (newFavorites) => {
	loadFlowersFavorites(newFavorites)
}, { immediate: true })

</script>
