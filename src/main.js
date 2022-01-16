import {createApp} from 'vue'
import router from './router'
import Root from './Root.vue'
import axios from 'axios';

import Element from "./components/Element.vue";
import style from "/scss/app.scss";
import Dock from "./components/Dock.vue";
import Selector from "./components/Selector.vue";
import Pane from "./components/Pane.vue";
import Group from "./components/Group.vue";
import Header from "./components/Header.vue";

const app = createApp(Root)


app.component("Element", Element)
app.component("Dock", Dock)
app.component("Selector", Selector)
app.component("Pane", Pane)
app.component("Group", Group)
app.component("Header", Header)


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

app.config.globalProperties.$http = axios

app.use(router)

app.mount('#app')
