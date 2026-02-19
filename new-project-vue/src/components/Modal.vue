<template>
	<div
		v-if="isOpen"
		class="modal"
	>
		<slot/>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	}
})
watch(() => props.modelValue, (newValue) => {
	isOpen.value = newValue
})
const isOpen = ref(props.modelValue)
</script>
