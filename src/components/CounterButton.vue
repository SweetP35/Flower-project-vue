<template>
	<div class="counter">
		<div
			class="counter__button"
			@click.stop="decrementCount"
		>
			-
		</div>
		<div
			class="counter__input"
			@click.stop
		>
			{{ count }}
		</div>
		<div
			class="counter__button"
			@click.stop="incrementCount"
		>
			+
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
	count: {
		type: Number,
		default: 1
	}
})
const emit = defineEmits(['remove', 'add'])
const count = ref(props.count)

const decrementCount = () => {
	if (count.value <= 1) {
		emit('remove', 0)
		return
	}
	count.value--
	emit('remove', count.value)
}

const incrementCount = () => {
	if (count.value < 20) {
		count.value++
		emit('add', count.value)
	}
}
</script>
