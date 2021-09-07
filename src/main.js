import {createApp} from 'vue'
import router from './router'
import Root from './Root.vue'

import axios from 'axios';

const app = createApp(Root)
app.use(router)
app.mount('#app')

app.config.globalProperties.$http = axios
