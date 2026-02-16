<template>
	<div
		class="sort-filter"
		:class="{ '__active': isOpen }"
	>
		<div
			v-click-outside="closeSort"
			class="sort-filter__content"
		>
			<div class="sort-filter__title">
				Сортировка по:
			</div>
			<div
				class="sort-filter__head"
				@click="isOpen = !isOpen"
			>
				<div class="sort-filter__head-text">
					{{ value.title }}
				</div>
				<img
					src="../icons/dropdown.png"
					alt="dropdown"
				>
			</div>
			<div class="sort-filter__body">
				<div
					v-for="item in items"
					:key="item.id"
					class="sort-filter__body-wrapper"
					@click="onClick(item)"
				>
					<div class="sort-filter__item">
						{{ item.title }}
					</div>
					<img
						v-if="value.id === item.id"
						src="../icons/flower-sortSelect.svg"
						alt=""
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
	items: {
		type: Array,
		required: true,
	}
})
const emit = defineEmits(['sort'])
const value = ref(props.items[0])
const isOpen = ref(false)
const onClick = (item) => {
	value.value = item
	isOpen.value = false
	emit('sort', item.sort)
}
const closeSort = () => {
	isOpen.value = false
}
</script>
