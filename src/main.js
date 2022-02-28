import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/index.scss'

var app = createApp(App)
    app.use(router)
    app.mount('#app')
