import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue';
import ProductionTracking from '../views/ProductionTracking.vue';
import QualityControl from '../views/QualityControl.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// {
		// 	path: '/',
		// 	name: 'home',
		// 	component: HomeView
		// },
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import('../views/AboutView.vue')
		// },
		{ path: '/', component: Dashboard },
		{ path: '/production-tracking', component: ProductionTracking },
		{ path: '/quality-control', component: QualityControl },
	]
})

export default router
