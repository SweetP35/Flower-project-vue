<template>
	<div class="flowers-cards">
		<FlowerCard
			v-for="flower in items"
			:key="flower.id"
			:item="flower"
			@click="goToFlowerDetails(flower.documentId)"
		/>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import FlowerCard from './FlowerCard.vue'
const router = useRouter()

defineProps({
	items: {
		type: Array,
		required: true
	}
})

const goToFlowerDetails = (id) => {
	router.push(`/flower-details/${id}`)
}

</script>
