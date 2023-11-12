import { createApp } from 'vue'
import ElementPlus from '../packages/cobyte-ui'
import '@cobyte-ui/theme-chalk/src/index.scss'
import App from './src/App.vue'

const app = createApp(App)
// 安装组件库
app.use(ElementPlus)
app.mount('#app')
