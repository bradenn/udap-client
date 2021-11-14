import {createRouter, createWebHistory} from "vue-router";
import Home from "./components/Home.vue"
import Apps from "./components/Apps.vue"
import Terminal from "./components/Terminal.vue";
import Register from "./components/Register.vue";
import Settings from "./components/Settings.vue";
import Instances from "./components/settings/Instances.vue";
import Endpoint from "./components/settings/Endpoint.vue";
import Connection from "./components/settings/Connection.vue";
import Diagnostic from "./components/Diagnostic.vue";
import Entities from "./components/settings/Entities.vue";
import Cameras from "./components/Cameras.vue";
import Security from "./components/Security.vue";

const routes = [
    {
        path: '/',
        name: 'Register',
        component: Register
    },
    {
        path: '/diagnostic',
        name: 'Diagnostic',
        component: Diagnostic
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
                meta: { slideOrder: 0 }
            },
            {
                path: '/terminal/camera',
                name: 'Cameras',
                icon: 'bi-camera-video',
                component: Cameras,
                meta: { slideOrder: 1 },
            },
            {
                path: '/terminal/apps',
                name: 'Apps',
                component: Apps,
                meta: { slideOrder: 2 }
            },
            {
                path: '/terminal/security',
                name: 'Security',
                component: Security,
                meta: { slideOrder: 3 }
            },
            {
                path: '/terminal/settings',
                name: 'Settings',
                redirect: '/terminal/settings/endpoint',
                component: Settings,
                meta: { slideOrder: 4 },
                children: [
                    {
                        path: '/terminal/settings/endpoint',
                        name: 'Endpoint',
                        component: Endpoint,
                        icon: 'bi-display',
                        meta: { slideOrder: 4 },
                    },
                    {
                        path: '/terminal/settings/instances',
                        name: 'Instances',
                        icon: 'bi-layers',
                        component: Instances,
                        meta: { slideOrder: 4 },
                    },
                    {
                        path: '/terminal/settings/entities',
                        name: 'Entities',
                        icon: 'bi-lightbulb',
                        component: Entities,
                        meta: { slideOrder: 4 },
                    },
                    {
                        path: '/terminal/settings/connection',
                        name: 'Connection',
                        icon: 'bi-diagram-3',
                        component: Connection,
                        meta: { slideOrder: 4 },
                    }
                ]
            },

        ]
    },

]


const router = createRouter({history: createWebHistory(), routes})

export default router
