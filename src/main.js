import 'vuetify/styles'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// plugins
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(vuetify)
app.use(Vue3Toastify, {
    autoClose: 3000
})

app.use(createPinia())
app.use(router)

app.mount('#app')
