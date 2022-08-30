import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/icons/iconfont.js'
import '@/theme/index.scss'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn
})
app.use(router)
app.use(createPinia())
app.mount('#app')
