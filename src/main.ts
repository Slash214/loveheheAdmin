import { createApp } from 'vue'
import App from './App.vue'
import '@/icons/iconfont.js'
import '@/theme/index.scss'
import 'element-plus/dist/index.css'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
