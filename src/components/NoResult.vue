<template>
	<div class="no-result">
		<div class="no-result__title">
			{{ title }}
		</div>
		<img
			src="../icons/sadIcon.svg"
			alt=""
		>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		required: true
	}
})
</script>
