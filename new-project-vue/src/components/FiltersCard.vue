<template>
	<div class="filters-card">
		<div class="filters-card__price">
			<div class="filters-card__price-title">
				Цена
			</div>
			<div class="filters-card__price-inputs">
				<input
					v-model="pricesValue.min"
					type="number"
					placeholder="От"
				>
				<input
					v-model="pricesValue.max"
					type="number"
					placeholder="До"
				>
			</div>
		</div>
		<div class="filters-card__category">
			<div class="filters-card__category-title">
				Компоненты букета
			</div>
			<CustomCheckbox
				v-for="category in categories"
				:key="category.title"
				:category="category"
			/>
		</div>
		<div class="filters-card__buttons">
			<div
				class="filters-card__button"
				@click="reset"
			>
				Сбросить
			</div>
			<div
				class="filters-card__button"
				@click="apply"
			>
				Применить
			</div>
		</div>
	</div>
</template>

<script setup>
import CustomCheckbox from './CustomCheckbox.vue'
import { reactive } from 'vue'
const props = defineProps({
	categories: {
		type: Array,
		required: true
	},
	pricesValue: {
		type: Object,
		required: true
	}
})
const emit = defineEmits(['apply'])
const pricesValue = reactive(props.pricesValue)
const reset = () => {
	props.categories.forEach(category => {
		category.checked = false
	})
	pricesValue.min = ''
	pricesValue.max = ''
}
const apply = () => {
	emit('apply')
}
</script>
