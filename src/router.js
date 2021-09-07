import {createRouter, createWebHistory} from "vue-router";
import Endpoints from "./components/Endpoints.vue"
import Endpoint from "./components/Endpoint.vue"
import Home from "./components/Home.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/endpoints',
        name: 'Endpoints',
        component: Endpoints,

    },
    {
        path: '/endpoints/:id',
        name: 'Endpoint',
        component: Endpoint,
        params: ['id']
    }
]



const router = createRouter({history: createWebHistory(), routes})

export default router
