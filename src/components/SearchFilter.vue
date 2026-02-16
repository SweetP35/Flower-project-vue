<template>
	<div
		v-click-outside="closeSearch"
		class="search-filter"
		:class="{ '__active': isOpen }"
	>
		<form
			class="search-filter__form"
			@submit.prevent
		>
			<img
				class="search-filter__img"
				src="../icons/magnifier-search.svg"
				alt="Поиск"
			>
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Поиск"
				@input="onSearch"
			>
			<img
				v-if="searchQuery"
				class="search-filter__close"
				src="../icons/close.svg"
				alt="Поиск"
				@click="searchQuery = ''"
			>
		</form>
		<div
			class="search-filter__result"
		>
			<template v-if="lengthArray !== 0 && searchQuery">
				<div
					v-for="(item,i) in items"
					:key="i"
					@click="click"
				>
					<slot :item="item"/>
				</div>
			</template>
			<NoResult
				v-if="lengthArray === 0 && searchQuery"
				title="По вашему запросу ничего не найдено"
			/>
			<Loader v-if="loading"/>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import NoResult from './NoResult.vue'
import Loader from './loader.vue'
const props = defineProps({
	lengthArray: {
		type: Number,
		required: true
	},
	loading: {
		type: Boolean,
		default: true
	},
	clearable: {
		type: Boolean,
		default: false
	},
	items: {
		type: Array,
		required: true
	}
})
const emit = defineEmits(['search', 'click'])
const isOpen = ref(false)
const searchQuery = ref('')
const onSearch = () => {
	if (searchQuery.value) {
		isOpen.value = true
		emit('search', searchQuery.value)
	} else {
		closeSearch()
	}
}

const closeSearch = () => {
	searchQuery.value = ''
	isOpen.value = false
}

const click = () => {
	emit('click')
	if (props.clearable){
		closeSearch()
	}
}

</script>
