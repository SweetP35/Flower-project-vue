<template>
	<div class="container">
		<div class="pagination">
			<div
				class="pagination__button"
				@click="prevPage"
			>
				<img
					class="pagination__button-prev"
					src="@/icons/arrow.svg"
					alt=""
				>
			</div>
			<div
				v-for="number in totalPage"
				:key="number"
				class="pagination__number"
				:class="{ '__active': number === currentPage }"
				@click="goToPage(number)"
			>
				{{ number }}
			</div>
			<div
				class="pagination__button"
				@click="nextPage"
			>
				<img
					class="pagination__button-next"
					src="@/icons/arrow.svg"
					alt=""
				>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	currentPage: {
		type: Number,
		required: true
	},
	totalPage: {
		type: Number,
		required: true
	}
})
const emit = defineEmits(['onPageChange'])

const prevPage = () => {
	if (props.currentPage > 1) {
		emit('onPageChange', props.currentPage - 1)
	}
}

const nextPage = () => {
	if (props.currentPage < props.totalPage){
		emit('onPageChange', props.currentPage + 1)
	}
}

const goToPage = (page) => {
	if (page !== props.currentPage) {
		emit('onPageChange', page)
	}
}


</script>
