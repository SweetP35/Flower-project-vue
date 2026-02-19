<template>
	<div
		class="filters-card__category-item"
		@click="checked(category.value)"
	>
		<div class="filters-card__custom-checkbox">
			<img
				v-show="category.checked"
				src="../icons/check.svg"
				alt="check"
			>
		</div>
		<div class="filters-card__text">
			{{ category.title }}
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
	category: {
		type: Object,
		required: true
	}
})
const emit = defineEmits(['checked'])
const category = reactive(props.category)

const checked = (value) => {
	category.checked = !category.checked
	emit('checked', value)
}
</script>
