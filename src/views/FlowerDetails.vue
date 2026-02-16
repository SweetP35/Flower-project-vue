<template>
	<template v-if="isLoading">
		<Loader/>
	</template>
	<template v-else>
		<div class="container">
			<div class="flower-details">
				<div class="flower-details__img">
					<img
						:src="flowerInfo.imageLink"
						alt=""
					>
				</div>
				<div class="flower-details__info">
					<div class="flower-details__info-wrapper">
						<div class="flower-details__title">
							{{ flowerInfo.title }}
						</div>
						<div class="flower-details__price">
							{{ flowerInfo.price.toLocaleString() }} ₽
						</div>
						<div class="flower-details__description">
							{{ flowerInfo.description }}
						</div>
						<div class="flower-details__size">
							<span>Размер на фото:</span> {{ flowerInfo.size }}.
						</div>
						<div class="flower-details__delivery">
							<span>Доставка:</span> {{ flowerInfo.delivery }}
						</div>
					</div>
					<div
						v-if="authUser"
						class="flower-details__counter"
					>
						<CounterButton/>
						<div class="flower-details__button">
							Добавить в корзину
						</div>
					</div>
				</div>
			</div>
			<div class="flower-care">
				<div class="flower-care__title">
					Рекомендации по уходу за букетом:
				</div>
				<div
					class="flower-care__text"
					v-html="flowerInfo.flowerCare.replace(/\n/g, '<br>')"
				/>
			</div>
		</div>
	</template>
</template>


<script setup>
import CounterButton from '@/components/CounterButton.vue'
import { fetchData } from '@/plugins/http'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Loader from '@/components/loader.vue'
import { useStore } from 'vuex'
const store = useStore()
const authUser = computed(() => store.state.user)
const route = useRoute()
const flowerInfo = ref(null)
const isLoading = ref(true)
const getFlower = async () => {
	try {
		const data = await fetchData(`http://localhost:1337/api/flowers-lists/${route.params.id}`, 'GET')
		flowerInfo.value = data.data
	} catch (error) {
		console.error('Ошибка при загрузке цветка:', error)
	} finally {
		isLoading.value = false
	}
}
getFlower()

watch(() => route.params.id, getFlower)


</script>
