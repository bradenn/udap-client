import {createRouter, createWebHistory} from "vue-router";
import Endpoint from "./components/Endpoint.vue"
import Home from "./components/Home.vue"
import Tools from "./components/Tools.vue"
import Terminal from "./components/Terminal.vue";
import Register from "./components/Register.vue";
import Settings from "./components/Settings.vue";
import Config from "./components/settings/Config.vue";
import General from "./components/settings/General.vue";
import Connection from "./components/settings/Connection.vue";

const routes = [
    {
        path: '/',
        name: 'Register',
        component: Register
    },
    {
        path: '/terminal',
        name: 'Terminal',
        redirect: '/terminal/home',
        component: Terminal,
        children: [
            {
                path: '/terminal/home',
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
                redirect: '/terminal/settings/general',
                component: Settings,
                children: [
                    {
                        path: '/terminal/settings/general',
                        name: 'General',
                        component: General,
                    },
                    {
                        path: '/terminal/settings/config',
                        name: 'Config',
                        component: Config,
                    },
                    {
                        path: '/terminal/settings/connection',
                        name: 'Connection',
                        component: Connection,
                    }
                ]
            }
        ]
    },
]


const router = createRouter({history: createWebHistory(), routes})

export default router
