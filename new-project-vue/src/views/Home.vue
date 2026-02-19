<template>
	<div class="home">
		<div class="home__title">
			Доставка цветов
		</div>
	</div>
	<div class="container">
		<div class="home__filters">
			<FiltersModal
				@apply="handleApply"
			/>
			<SortFilter
				:items="list"
				@sort="handleSort"
			/>
		</div>
		<template v-if="!loading">
			<FlowersCards :items="flowersList"/>
			<div
				v-if="flowersList.length === 0"
				class="home__no-result"
			>
				<NoResult
					title="По вашему запросу ничего не найдено"
				/>
			</div>
			<Pagination
				v-if="totalPage > 1"
				:current-page="currentPage"
				:total-page="totalPage"
				@on-page-change="handlePageChange"
			/>
		</template>
		<Loader v-else/>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import FiltersModal from '../components/FiltersModal.vue'
import SortFilter from '../components/SortFilter.vue'
import FlowersCards from '@/components/FlowersCards.vue'
import Pagination from '@/components/Pagination.vue'
import { fetchData } from '@/plugins/http'
import Loader from '@/components/loader.vue'
import NoResult from '@/components/NoResult.vue'
const loading = ref(true)
const currentPage = ref(1)
const totalPage = ref(0)
const flowersList = ref([])
const selectedCategories = ref([])
const prices = ref({
	min: null,
	max: null
})

const list = ref([
	{
		title: 'по порядку',
		id: 'order',
		sort: 'createdAt:asc'
	},
	{
		title: 'по убыванию цены',
		id: 'price-desc',
		sort: 'price:desc'
	},
	{
		title: 'по возрастанию цены',
		id: 'price-asc',
		sort: 'price:asc'
	}
])
const handlePageChange = (page) => {
	currentPage.value = page
	loadFlowers()
}

const sort = ref('createdAt:asc')
const handleSort = (sortParam) => {
	sort.value = sortParam
	loadFlowers()
}

const handleApply = (categories, value) => {
	selectedCategories.value = categories
	prices.value = value
	loadFlowers()
}

const loadFlowers = async () => {
	try {
		let url = `http://localhost:1337/api/flowers-lists?pagination[page]=${currentPage.value}&pagination[pageSize]=6&sort=${sort.value}`
		if (selectedCategories.value.length > 0) {
			const filters = selectedCategories.value.map(category =>
				`filters[categories][slug][$in]=${category}`
			)
			url += `&${filters.join('&')}`
		}
		if (prices.value.min) {
			url += `&filters[price][$gte]=${prices.value.min}`
		}
		if (prices.value.max) {
			url += `&filters[price][$lte]=${prices.value.max}`
		}
		const data = await fetchData(url, 'GET')
		flowersList.value = data.data
		totalPage.value = data.meta.pagination.pageCount
	} catch (error) {
		console.error('Ошибка при загрузке цветов:', error)
	} finally {
		loading.value = false
	}
}
loadFlowers()
</script>
