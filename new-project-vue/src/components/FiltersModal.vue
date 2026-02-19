<template>
	<div
		class="filters-modal"
		@click.stop="isOpen = !isOpen"
	>
		<div class="filters-modal__wrapper">
			<img
				src="../icons/filter.svg"
				alt="filter"
			>
			<div
				class="filters-modal__title"
			>
				Фильтры
			</div>
		</div>
	</div>
	<Modal :model-value="isOpen">
		<FiltersCard
			v-click-outside="closeModal"
			:categories="categoriesList"
			:prices-value="pricesValue"
			@apply="apply"
		/>
	</Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'
import FiltersCard from './FiltersCard.vue'
const emit = defineEmits(['apply'])
const isOpen = ref(false)
const pricesValue = ref({ min: '', max: '' })
const categoriesList = ref([
	{ title: 'Пионы', checked: false, value: 'pyon' },
	{ title: 'Оксипеталум', checked: false, value: 'oksipetalum' },
	{ title: 'Дельфиниум', checked: false, value: 'delfiniyum' },
	{ title: 'Сирень', checked: false, value: 'siren' },
	{ title: 'Гипсофила', checked: false, value: 'hipsofila' },
	{ title: 'Тюльпаны', checked: false, value: 'tulpany' },
	{ title: 'Розы', checked: false, value: 'rosy' },
])
const closeModal = () => {
	isOpen.value = false
}
const apply = () => {
	const selectedCategories = categoriesList.value
		.filter(({ checked }) => checked)
		.map(({ value }) => value)
	isOpen.value = false
	emit('apply', selectedCategories, pricesValue.value)
}
</script>
