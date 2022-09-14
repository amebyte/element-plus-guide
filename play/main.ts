import { createApp } from 'vue'
import App from './src/App.vue'
import CIcon from '@cobyte/components/icon'

const plugins = [
    CIcon
]

const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
