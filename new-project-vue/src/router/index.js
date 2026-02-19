import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{ path: '/', component: () => import('../layout/MainLayout.vue'), children: [
		{ path: '/', component: () => import('../views/Home.vue') },
		{ path: '/flower-details/:id', component: () => import('../views/FlowerDetails.vue') },
		{ path: '/about', component: () => import('../views/About.vue') },
		{ path: '/delivery-and-pay', component: () => import('../views/DeliveryAndPay.vue') },
		{ path: '/favorites', component: () => import('../views/Favorites.vue') },
		{ path: '/cart', component: () => import('../views/Cart.vue') }
	] }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
