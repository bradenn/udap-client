import {createApp, reactive} from 'vue'
import router from './router'
import Root from './Root.vue'
import axios from 'axios';

const app = createApp(Root)

let preferences = {
    connection: {
        connected: false,
        connecting: false,
        websocket: undefined
    },
    preferences: {
        theme: "dark",
        accent: "blue",
        background: "viridian"
    },
    config: {
        host: "localhost",
        port: 3020,
    },
    session: {
        token: "",
        endpoint: {},
        instances: [],
        metadata: {}
    }
}

if (!localStorage.getItem('context')) {
    localStorage.setItem('context', JSON.stringify(preferences))
}

app.config.globalProperties.$timeSince = function (date) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }

    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }

    return interval + ' ' + intervalType;
};

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
