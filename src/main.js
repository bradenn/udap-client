import {createApp} from 'vue'
import router from './router'
import Root from './Root.vue'

import axios from 'axios';

const app = createApp(Root)
app.use(router)
app.mount('#app')


app.config.globalProperties.$sessionId = localStorage.getItem('sessionId') || "unset"
app.config.globalProperties.$setSessionId = (sessionId) => {
    localStorage.setItem('sessionId', sessionId)
}

app.config.globalProperties.$host = "http://localhost:3020"
app.config.globalProperties.$http = axios
