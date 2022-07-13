import { createApp } from 'vue'
import App from './App.vue'
import '@/icons/iconfont.js'
import 'element-plus/dist/index.css'
import '@/theme/index.scss'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
