import {createRouter, createWebHistory} from "vue-router";
import Endpoint from "./components/Endpoint.vue"
import Home from "./components/Home.vue"
import Tools from "./components/Tools.vue"
import Terminal from "./components/Terminal.vue";
import Register from "./components/Register.vue";

const routes = [
    {
        path: '/',
        name: 'Register',
        component: Register
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
]


const router = createRouter({history: createWebHistory(), routes})

export default router
