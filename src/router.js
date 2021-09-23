import {createRouter, createWebHistory} from "vue-router";
import Endpoints from "./components/Endpoints.vue"
import Endpoint from "./components/Endpoint.vue"
import Home from "./components/Home.vue"
import Tools from "./components/Tools.vue"
import Terminal from "./components/Terminal.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/terminal',
        name: 'Terminal',
        component: Terminal,
        children: [
            {
                path: '/terminal',
                name: 'Home',
                component: Home,
            },
            {
                path: '/terminal/tools',
                name: 'Tools',
                component: Tools,
            },
            {
                path: '/terminal/settings',
                name: 'Settings',
                component: Endpoint,
            }
        ]
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
    },
]


const router = createRouter({history: createWebHistory(), routes})

export default router
