import {createRouter, createWebHistory} from "vue-router";
import Home from "./views/Home.vue"
import Apps from "./views/Apps.vue"
import Terminal from "./components/Terminal.vue";
import Register from "./views/Register.vue";
import Settings from "./views/Settings.vue";
import Endpoint from "./views/settings/Endpoint.vue";
import Connection from "./views/settings/Connection.vue";
import Entities from "./views/settings/Entities.vue";
import Shell from "./views/Shell.vue";
import Whiteboard from "./components/apps/Whiteboard.vue";
import Network from "./views/settings/Network.vue";
import Media from "./components/apps/Media.vue";
import Room from "./views/Room.vue";

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
                path: '/terminal/apps/whiteboard',
                name: 'Whiteboard',
                component: Whiteboard,
                icon: '􀏒',
                meta: {slideOrder: 4},
            },
            {
                path: '/terminal/apps/media',
                name: 'Media',
                component: Media,
                icon: '􀑪',
                meta: {slideOrder: 4},
            },
            {
                path: '/terminal/apps/room',
                name: 'Room',
                component: Room,
                icon: '􀑪',
                meta: {slideOrder: 4},
            },
            {
                path: '/terminal/home',
                name: 'Home',
                component: Home,
                meta: {slideOrder: 0}
            },
            {
                path: '/terminal/apps',
                name: 'Apps',
                component: Apps,
                meta: {slideOrder: 2},
            },
            {
                path: '/terminal/shell',
                name: 'Shell',
                component: Shell,
                meta: {slideOrder: 3}
            },
            {
                path: '/terminal/settings',
                name: 'Settings',
                redirect: '/terminal/settings/endpoint',
                component: Settings,
                meta: {slideOrder: 4},
                children: [
                    {
                        path: '/terminal/settings/endpoint',
                        name: 'Endpoint',
                        component: Endpoint,
                        icon: 'bi-display',
                        sf: '􀢹',
                        meta: {slideOrder: 4},
                    },
                    {
                        path: '/terminal/settings/entities',
                        name: 'Entities',
                        icon: 'bi-lightbulb',
                        sf: '􀛭',
                        component: Entities,
                        meta: {slideOrder: 4},
                    },
                    {
                        path: '/terminal/settings/connection',
                        name: 'Connection',
                        icon: 'bi-link',
                        sf: '􀉣',
                        component: Connection,
                        meta: {slideOrder: 4},
                    },
                    {
                        path: '/terminal/settings/network',
                        name: 'Network',
                        icon: 'bi-diagram-3',
                        sf: '􀤆',
                        component: Network,
                        meta: {slideOrder: 4},
                    }
                ]
            },

        ]
    },

]


const router = createRouter({history: createWebHistory(), routes})

export default router
