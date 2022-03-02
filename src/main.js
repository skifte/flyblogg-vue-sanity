import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag-next'
import './assets/styles/index.scss'

var app = createApp(App)
    app.use(router)
    app.use(VueGtag, {
        property: {
          id: 'G-G6R563WXWG',
          params: {
            send_page_view: false
          }
        }
      })
    app.mount('#app')
