import {createApp} from 'vue'
import router from './router'
import Root from './Root.vue'
import axios from 'axios';

const app = createApp(Root)


app.config.globalProperties.$host = localStorage.getItem('host') || "localhost:3020"
app.config.globalProperties.$setSessionId = (sessionId) => {
    localStorage.setItem('host', sessionId)
}
app.config.globalProperties.$sessionId = localStorage.getItem('sessionId') || "unset"
app.config.globalProperties.$setSessionId = (sessionId) => {
    localStorage.setItem('sessionId', sessionId)
}

app.config.globalProperties.$http = axios

app.use(router)
app.mount('#app')
