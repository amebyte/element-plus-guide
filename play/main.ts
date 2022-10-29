import { createApp } from 'vue'
import CIcon from '@cobyte-ui/components/icon'
import App from './src/App.vue'

const plugins = [CIcon]

const app = createApp(App)
plugins.forEach((plugin) => app.use(plugin))

app.mount('#app')
