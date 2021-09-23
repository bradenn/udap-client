import {createApp} from 'vue'
import router from './router'
import Root from './Root.vue'

import axios from 'axios';

const app = createApp(Root)
app.use(router)
app.mount('#app')

app.config.globalProperties.$JWT = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2ViMTcxM2JlYmIxZWJlMjFjNjQwMyJ9.6NSXyOUxUAWiGzj78328_sSXb0f0_lE_JA2G5ocnCpH3fBm9imvDS2SgNwLQOlm9bQ6tJ0bnMX3rY_pv_W9-FQ"
app.config.globalProperties.$http = axios
