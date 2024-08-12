import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePlateauView from '../views/CreatePlateauView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/criar-plateau',
            name: 'criar-plateau',
            component: CreatePlateauView
        }
    ]
})

export default router
