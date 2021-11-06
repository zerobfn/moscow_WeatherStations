import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'homepage',
        component: HomePage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
