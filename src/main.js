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


let configDefault = {
    endpointId: "",
    instances: [],
    background: "",
}

if (!localStorage.getItem('instances')) localStorage.setItem('instances', JSON.stringify([]))

app.config.globalProperties.$instances = JSON.parse(localStorage.getItem('instances'))

app.config.globalProperties.$addInstance = function (instance) {
    let current = JSON.parse(localStorage.getItem('instances'))
    if (!current.includes(instance)) {
        current.push(instance)
        localStorage.setItem('instances', JSON.stringify(current))
        app.config.globalProperties.$instances = current;
    }
}
app.config.globalProperties.$removeInstance = function (instance) {
    let current = JSON.parse(localStorage.getItem('instances'))
    if (current.includes(instance)) {
        let cache = current.filter(id => id !== instance);
        localStorage.setItem('instances', JSON.stringify(current.filter(id => id !== instance)))
        app.config.globalProperties.$instances = cache;
    }
}

app.config.globalProperties.$http = axios

app.use(router)
app.mount('#app')
