import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import outsideClick from './plugins/outsideClick'
import store from './store'


const app = createApp(App)
app.use(router)
app.use(store)
app.directive('click-outside', outsideClick)
app.mount('#app')
