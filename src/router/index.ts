import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePlateauView from '../views/CreatePlateauView.vue'
import CreateRoverView from '../views/CreateRoverView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/create-plateau',
            name: 'create-plateau',
            component: CreatePlateauView
        },
        {
            path: '/create-rover',
            name: 'create-rover',
            component: CreateRoverView
        }

    ]
})

export default router
