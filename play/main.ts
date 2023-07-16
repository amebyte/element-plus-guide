import { createApp } from 'vue'
import ElIcon from '@cobyte-ui/components/icon'
import ElButton, { ElButtonGroup } from '@cobyte-ui/components/button'
import ElInput from '@cobyte-ui/components/input'
import { ElForm, ElFormItem } from '@cobyte-ui/components/form1'
import '@cobyte-ui/theme-chalk/src/index.scss'
import App from './src/App.vue'

// 组件库
const components = [
  ElIcon,
  ElButton,
  ElButtonGroup,
  ElInput,
  ElForm,
  ElFormItem,
]
// 是否已安装标识
const INSTALLED_KEY = Symbol('INSTALLED_KEY')
// 组件库插件
const ElementPlus = {
  install(app: any) {
    // 如果该组件库已经安装过了，则不进行安装
    if (app[INSTALLED_KEY]) return
    // 将标识值设置为 true，表示已经安装了
    app[INSTALLED_KEY] = true
    // 循环组件库中的每个组件进行安装
    components.forEach((c) => app.use(c))
  },
}

const app = createApp(App)
// 安装组件库
app.use(ElementPlus)
app.mount('#app')
